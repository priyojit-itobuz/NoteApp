import note from "../models/noteModel.js";
import user from "../models/userModel.js";

// export const isLoggedIn = async (req,res,next) => {
//   try {
//     const {userId} = req.body;
//     const currentUserId = await note.findById({userId}); 
//     console.log(currentUserId);
    
//     if(!currentUserId.length)
//     {
//            return res.status(400).json({
//              success : false,
//              message  : "User not loggedin"
//            })
//     }
//     const response = currentUserId[0].userId
//     const userVerify = await user.findOne(response);
//     const loginStatus = userVerify.isVerified;
//     if(loginStatus)
//     {
//         next();
//     }
//   } catch (error) {
//     res.status(500).json({ 
//         success  :false,
//         message : "server error"
//     });
//   }
// };


export const isLoggedIn = async (req, res, next) => {
  try {
    const { userId } = req.body;

    console.log(userId);
    
    // Validate if userId is provided
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Fetch the user using the userId
    const userVerify = await user.findById(userId);
    console.log(userVerify);
    

    // Check if the user exists and is verified
    if (!userVerify) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!userVerify.isVerified) {
      return res.status(403).json({
        success: false,
        message: "User is not logged in or not verified.",
      });
    }

    // Proceed to the next middleware if user is verified
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
