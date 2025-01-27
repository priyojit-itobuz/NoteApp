import jwt from "jsonwebtoken";
import user from "../models/userModel.js";

export const verifyToken = async (req, res) => {
  const { token } = req.params;


  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token,process.env.SECRET_KEY, async (error, decoded) => {
    if (error) {
      console.log(error);
      res.send(
        '"Email verification failed, possibly the link is invalid or expired"'
      );
      res.status(401).json({ error: "Unauthorized" });
    } else {
      await user.findOneAndUpdate(
        { token: token },
        { $set: { isVerified: "true", token: null } },
        { new: true }
      );
      res.send("Email verified successfully");
    }
  });
};


// export const verifyToken = async (req, res) => {
//   // const { token } = req.params;

  // const authHeader = req.headers.authorization;
  // console.log("auth",authHeader);
  
//   if(authHeader)
//   {
//     const token = authHeader.split(" ")[1];
//     console.log("token",token);
    
  

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   jwt.verify(token,process.env.SECRET_KEY, async (error, decoded) => {
//     if (error) {
//       console.log(error);
//       res.send(
//         '"Email verification failed, possibly the link is invalid or expired"'
//       );
//       res.status(401).json({ error: "Unauthorized" });
//     } else {
//       await user.findOneAndUpdate(
//         { token: token },
//         { $set: { isVerified: "true", token: null } },
//         { new: true }
//       );
//       res.send("Email verified successfully");
//     }
//   });
// }
// };