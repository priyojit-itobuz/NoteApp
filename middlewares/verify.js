import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import user from '../models/userModel.js'

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = decoded;
      next();
    });
};


//SignUp or Register User

export const register = async(req,res) => {
    try {
        // Check if the email already exists
        const {userName,email,password} = req.body;
        const existingUser = await user.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
        //Creating new user and generating token
        
        const token = jwt.sign({}, 'secret');
        const newUser = new user({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            token : token
          });
          
          await newUser.save();

        res.status(201).json({ 
            success : true,
            message: 'User registered successfully' ,
            token
        });
      } 
      catch (error) 
      {
        res.status(500).json({ 
            success : false,
            message : error.message,
            data : "Internal server error"
        });
      }
}

//login

export const login = async (req,res) => {
    try {
        // Check if the email exists
        const currentUser = await user.findOne({ email: req.body.email });
        
        if (!currentUser) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
   
        const passwordMatch = await bcrypt.compare(req.body.password, currentUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
      
          res.status(200).json({ 
            success : true,
            message : "Logged In" 
        });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
}

