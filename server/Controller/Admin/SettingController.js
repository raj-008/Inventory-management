const { sendResponse } = require("../../Utils/ResponseUtils");
const Setting = require("../../Models/SettingModel");
const asyncErrorHandler = require("../../Utils/asyncErrorHandler");

exports.read = asyncErrorHandler(async (req, res) => {
  const settings = await Setting.find({ user_id: req.params.id });

  return sendResponse(res, "Settings retrived successfully", settings);
});

exports.store = asyncErrorHandler(async (req, res) => {
  const input = req.body;
  const user = req.user;

  const existingSetting = await Setting.findOne({ user_id: user._id, key: input.key });

  if (existingSetting) {
    await Setting.updateOne({ user_id: user._id, key: input.key }, { value: input.value });
  } else {
    await Setting.create(input);
  }

  return sendResponse(res, "Setting Updated Successfully", 200);
});
