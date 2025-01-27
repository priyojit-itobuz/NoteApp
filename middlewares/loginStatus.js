import user from "../models/userModel.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const userId = req.params.id;
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
        message: "User not found. Please Login",
      });
    }

  
    if (!userVerify.isVerified || !userVerify.accessToken) {
      return res.status(403).json({
        success: false,
        message: "User is not logged in or not verified or AccessToken missing",
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
