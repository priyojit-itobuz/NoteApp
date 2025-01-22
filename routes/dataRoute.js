import express from "express"
import { addNote, addUser } from "../controllers/addData.js";
import { getNote, getUser } from "../controllers/getData.js";
import { login, register, verifyToken } from "../middlewares/verify.js";
// import user from '../models/userModel.js'
// import jwt from "jsonwebtoken"
// import bcrypt from "bcryptjs"

const route = express.Router();

route.post("/createUser",addUser);
route.post("/createNote",addNote)
route.get("/getUser",getUser);
route.get("/getNote",getNote);

route.post("/register",register);
route.post("/login",login)

export default route;