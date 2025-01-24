import note from "../models/noteModel.js";
import user from "../models/userModel.js";

export const isLoggedIn = async (req,res,next) => {
  try {
    const {userId} = req.body;
    const currentUserId = await note.find({userId}); 
    if(!currentUserId.length)
    {
           return res.status(400).json({
             success : false,
             message  : "User not loggedin"
           })
    }
    const response = currentUserId[0].userId
    const userVerify = await user.findOne(response);
    const loginStatus = userVerify.isVerified;
    if(loginStatus)
    {
        next();
    }
  } catch (error) {
    res.status(500).json({ 
        success  :false,
        message : "server error"
    });
  }
};
