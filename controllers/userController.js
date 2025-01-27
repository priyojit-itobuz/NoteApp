import user from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { mailSender } from "../EmailVerify/mailSender.js";

//SignUp or Register User
export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      if (!existingUser.isVerified) {
        // If the user exists but is not verified, update the token and password
        const token = jwt.sign({_id}, process.env.SECRET_KEY, { expiresIn: '10m' });
        const hashedPassword = await bcrypt.hash(password, 10);

        existingUser.userName = userName;
        existingUser.password = hashedPassword;
        existingUser.token = token;

        await existingUser.save();
        mailSender(token);

        return res.status(200).json({
          success: true,
          message: "User already exists but not verified. Verification email sent again.",
          token,
        });
      } else {
        // If the user exists and is verified, prevent duplicate registration
        return res.status(400).json({ error: "Email is already registered and verified." });
      }
    }

    // If the email doesn't exist, create a new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const userId = newUser._id;
    const token = jwt.sign({userId}, process.env.SECRET_KEY, { expiresIn: '10m' });
    newUser.token = token;
    newUser.accessToken = "";
    await newUser.save();
    mailSender(token);

    res.status(201).json({
      success: true,
      message: "User registered successfully. Verification email sent.",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: "Internal server error",
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    // Check if the email exists
    const currentUser = await user.findOne({ email: req.body.email });

    if (!currentUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      currentUser.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const accessToken = jwt.sign({}, process.env.SECRET_KEY, { expiresIn: '5m' });
    currentUser.accessToken = accessToken;
    await currentUser.save();

    res.status(200).json({
      success: true,
      message: "Logged In",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async(req,res) => {
  try {
    const id = req.params.id;
    const searchUser = await user.findById(id)
    if(searchUser && searchUser.isVerified === true)
    {
        searchUser.isVerified = false;
        searchUser.save();
        res.status(200).json({
          success: true,
          message: "User logout success"
        })
    }
    else
    {
      res.status(400).json({
        success : false,
        message : "User is not logged In, Login first"
      })
    }
  }
  catch(error)
  {
    res.status(500).json({
      success : false,
      message : "Internal Server Error"
    })
  }

}


