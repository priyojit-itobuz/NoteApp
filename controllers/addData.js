import user from "../models/userModel.js";
import note from "../models/userModel.js";

export const addUser = async (req, res) => {
  try {
    const { userName, email, password,token } = req.body;
    const response = await user.create({ userName, email, password ,token});
    if (response) {
      res.status(200).json({
        success: true,
        data: response,
        message: "User Created Success",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: "server error",
      message: error.message,
    });
  }
};


export const addNote = async (req, res) => {
  try {
    const {title,content,userId } = req.body;
    const response = await note.create({title,content,userId});
    if (response) {
      res.status(200).json({
        success: true,
        data: response,
        message: "Note Created Success",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: "server error",
      message: error.message,
    });
  }
};
