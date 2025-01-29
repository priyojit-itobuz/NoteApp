import user from "../models/userModel.js";
import jwt from "jsonwebtoken";


export const isLoggedIn = async (req, res, next) => {
  try {
    // const userId = req.params.id;
    const authHeader = req.headers.authorization;
    console.log("auth in middleware",authHeader);
  
    if(authHeader)
    {
      const accessToken = authHeader.split(" ")[1];
      console.log("token in middleware",accessToken);

      if (!accessToken) 
      {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
    jwt.verify(accessToken,process.env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        res.status(401).json({ success : false,
          error: "JWT expired" });
      } else 
      {
        const id = decoded.userId;
        req.body.userId  =  id;
        const userVerify = await user.findById(id);
        console.log("finding user in loginMiddleware",userVerify);
        
        if (!userVerify.isVerified || !accessToken) {
          return res.status(403).json({
            success: false,
            message: "User is not logged in or not verified or AccessToken missing",
          });
        }
    
        // Proceed to the next middleware if user is verified
        next();
      }
    });
  }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
