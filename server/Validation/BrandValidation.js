const { body } = require("express-validator");
const Brand = require("../Models/BrandModel");
const CustomError = require("../Utils/CustomError");

const BrandValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Brand Name should be text !")
      .notEmpty()
      .withMessage("Category can not be empty")
      .custom(async (value, { req }) => {
        if (value) {
          let brand;
          if (req.route.path === "/update/:id") {
            brand = await Brand.findOne({ name: value, _id: { $ne: req.params.id } });
          } else {
            brand = await Brand.findOne({ name: value });
          }

          if (brand) {
            throw new CustomError("Brand already exist", 404);
          }
        }
      }),
    body("status").notEmpty().isBoolean().withMessage("Status should be True/False only"),
  ];
};

module.exports = BrandValidation;
