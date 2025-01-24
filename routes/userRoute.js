import express from "express"
import { login,register} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validate } from "../middlewares/validateData.js";
import { signupUser, loginUser } from "../validators/dataValidation.js";

const route = express.Router();

route.post("/register",validate(signupUser),register);
route.post("/login",validate(loginUser),login)
route.get("/verify/:token",verifyToken)
// route.get("/search",search)


export default route;
