import user from "../models/userModel.js";
import note from "../models/userModel.js";

export const getUser = async (req, res) => {
  try {
    const users = await user.find({});
    if (users) {
      res.status(200).json({
        success: true,
        message: "User fetched success",
        users,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User fetch Failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: "server error",
      message: error.message,
    });
  }
};

export const getNote = async (req, res) => {
  try {
    const notes = await note.find({});
    if (notes) {
      res.status(200).json({
        success: true,
        message: "Note fetched success",
        data: note,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Note fetch fail",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: "Internal server error",
    });
  }
};
