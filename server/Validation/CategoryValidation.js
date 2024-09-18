const { body } = require("express-validator");
const Category = require("../Models/CategoryModel");
const CustomError = require("../Utils/CustomError");

const CategoryValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Category Should be text only")
      .notEmpty()
      .withMessage("Category can not be empty")
      .custom(async (value, { req }) => {
        if (value) {
          let category;
          if (req.route.path === "/update/:id") {
            category = await Category.findOne({ name: value, _id: { $ne: req.params.id } });
          } else {
            category = await Category.findOne({ name: value });
          }
          if (category) {
            throw new CustomError("Category already exist", 404);
          }
        }
        return true;
      }),
  ];
};

module.exports = CategoryValidation;
