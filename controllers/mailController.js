import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import user from "../models/userModel.js";
import nodemailer from "nodemailer";

//SignUp or Register User
export const register = async (req, res) => {
    try {
      // Check if the email already exists
      const { userName, email, password } = req.body;
      const existingUser = await user.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
      //Creating new user and generating token
  
      const token = jwt.sign({}, "secret");
      const newUser = new user({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        token: token,
      });
  
      await newUser.save();
      mailSender(token);
  
      res.status(201).json({
        success: true,
        message: "User registered successfully",
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
  
  export const mailSender = async (token) => {
    console.log(token);
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "priyojit@itobuz.com",
        pass: "xjza wmlg naid qbjg",
      },
    });
  
    const mailConfiguration = {
      from: "Priyojit Kundu",
      to: "priyojit@itobuz.com",
      subject: "Email Verification",
      text: `Press the given link to verify => http://localhost:3000/verify/${token}`,
    };
  
    transporter.sendMail(mailConfiguration, (error, res) => {
      if (error) throw new Error("Something went wrong");
      else {
        console.log("Email sent successfully");
        console.log(res);
      }
    });
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
  
      res.status(200).json({
        success: true,
        message: "Logged In",
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  