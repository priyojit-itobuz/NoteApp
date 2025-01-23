import note from "../models/noteModel.js";

export const addNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const response = await note.create({ title, content, userId });

    if(response)
    {
      res.status(200).json({
        success: true,
        data: response,
        message: "Note Created Success",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: "server error",
      message: error.message,
    });
  }
};

export const getAllNote = async (req, res) => {
  try {
    const notes = await note.find({});
    if (notes) {
      res.status(200).json({
        success: true,
        message: "Note fetched success",
        data: notes,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Note fetch fail",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: "Internal server error",
    });
  }
};

export const getOneNote = async(req,res) => {
    try {
        const id = req.params.id;
        const particularNote = await note.findById({_id : id});
        if (particularNote) {
          res.status(200).json({
            success: true,
            message: "Note fetched success",
            particularNote,
          });
        }
    }
    catch(error) {
      res.status(500).json({
        success: false,
        data: "server error",
        message: "User cant be fetched",
      });
    }
}

export const updateNote = async(req,res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await note.findByIdAndUpdate(
      { _id: id },
      { title, content }
    );
    res.status(200).json({
      success: true,
      message: "Note updated Success",
      data : updatedNote
    });
  } catch (error) {
    res.status(500).json({
        success : false,
        data : "server error",
        message : "Note update failed"
    })
  }
}

export const deleteNote = async(req,res) => {
  try {
    const id = req.params.id;
    const deleteNote = await note.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Note Deleted Success",
        deleteNote
      });
  } catch (error) {
    res.status(500).json({
        success:false,
        message : "Note Delete Failed"
    })
  }
}