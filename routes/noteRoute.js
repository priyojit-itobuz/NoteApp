import express from 'express'
import { addNote, deleteNote, getAllNote, getOneNote, getParticularUserNote, search, updateNote } from '../controllers/noteController.js';
import { validate } from '../middlewares/validateData.js';
import { noteSchema } from '../validators/dataValidation.js';
import { isLoggedIn } from '../middlewares/loginStatus.js';
const route = express.Router();

route.post("/addNote",isLoggedIn,validate(noteSchema),addNote);
route.get("/getAllNote",getAllNote)
route.get("/getOneNote/:id",getOneNote)
route.get("/oneNote/:id",getParticularUserNote);
route.post("/search",search);
route.put("/updateNote/:id",validate(noteSchema),updateNote)
route.delete("/deleteNote/:id",isLoggedIn,deleteNote);


export default route;