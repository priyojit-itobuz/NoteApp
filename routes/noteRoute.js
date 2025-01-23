import express from 'express'
import { addNote, deleteNote, getAllNote, getOneNote, updateNote } from '../controllers/noteController.js';
import { validate } from '../middlewares/validateData.js';
import { noteSchema } from '../validators/dataValidation.js';
const route = express.Router();

route.post("/addNote",validate(noteSchema),addNote);
route.get("/getAllNote",getAllNote)
route.get("/getOneNote/:id",getOneNote)
route.put("/updateNote/:id",validate(noteSchema),updateNote)
route.delete("/deleteNote/:id",deleteNote);

export default route;