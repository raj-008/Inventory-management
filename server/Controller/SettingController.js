const Setting = require("../Models/SettingModel");
require("dotenv").config();
const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const { sendResponse } = require("../Utils/ResponseUtils");
const RemoveMedia = require("../Utils/RemoveMedia");

exports.show = asyncErrorHandler(async (req, res) => {
  const userid = req.params.id;

  const data = await Setting.find({ user_id: userid });

  res.send({ data: data, success: true });
});

exports.store = asyncErrorHandler(async (req, res) => {
  const input = req.body;
  const user = req.user;
  const media = req.file;

  const existingSetting = await Setting.findOne({ user_id: user._id, key: input.key });

  if (media) {
    input.value = "/uploads/profile/" + media.filename;
    RemoveMedia(existingSetting.value);
  }

  if (existingSetting) {
    await Setting.updateOne({ user_id: user._id, key: input.key }, { value: input.value });
  } else {
    await Setting.create(input);
  }

  return sendResponse(res, "Setting Updated Successfully", 200);
});
