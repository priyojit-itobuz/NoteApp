import express from 'express'
import { addNote, deleteNote, getAllNote, getOneNote, getPaginatedNotes, getParticularUserNote, search, sortNotes, updateNote } from '../controllers/noteController.js';
import { validate } from '../middlewares/validateData.js';
import { noteSchema } from '../validators/dataValidation.js';
import { isLoggedIn } from '../middlewares/loginStatus.js';
const route = express.Router();

route.post("/addNote",isLoggedIn,validate(noteSchema),addNote);
route.get("/getAllNote",getAllNote)
route.get("/getOneNote/:id",getOneNote)
route.get("/oneNote",isLoggedIn,getParticularUserNote);
route.get("/paginated",isLoggedIn,getPaginatedNotes)
route.post("/search",isLoggedIn,search);
route.put("/updateNote/:id",isLoggedIn,validate(noteSchema),updateNote)
route.delete("/deleteNote/:id",isLoggedIn,deleteNote);
route.get("/sort",isLoggedIn,sortNotes)


export default route;