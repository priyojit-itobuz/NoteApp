import multer from 'multer'
import path from 'path'
import user from "../models/userModel.js";
import note from "../models/noteModel.js";

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } // Limit file size to 1MB
});


export const uploadNotes = async(req,res) => {
    const id = req.params.id;
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const Note = await note.findById(id);
    if(Note)
    {
        Note.pic = req.file.originalname;
        await Note.save();
        return res.status(200).json({
            success : true,
            message: `File uploaded successfully: ${req.file.filename}`
        })
    }
    else
    {
        return res.status(500).json({
            success : false,
            message: "Internal Error"
        })
    }
}