import express from "express"
import { addNote, addUser } from "../controllers/addData.js";
import { getNote, getUser } from "../controllers/getData.js";
<<<<<<< HEAD
import { login, register, verifyToken } from "../middlewares/verify.js";
=======
import { login, register } from "../controllers/mailController.js";
import { verifyToken } from "../middlewares/verify.js";
>>>>>>> dadec58 (Feat: Token Verification done)


const route = express.Router();

route.post("/createUser",addUser);
route.post("/createNote",addNote)
route.get("/getUser",getUser);
route.get("/getNote",getNote);

route.post("/register",register);
route.post("/login",login)
route.get("/verify/:token",verifyToken)

export default route;
