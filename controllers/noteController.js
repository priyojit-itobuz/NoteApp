import { isLoggedIn } from "../middlewares/loginStatus.js";
import note from "../models/noteModel.js";
import user from "../models/userModel.js";

// add note based on usedId
export const addNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const response = await note.create({ title, content, userId });

    if (response) {
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

// get all note based on note id

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

// get all notes based on particular userId

export const getParticularUserNote = async (req, res) => {
  try {
    //  checking if desired userId present or note, if present return all the objects that have same userId
    const userId = req.params.id;
    const currentUserId = await note.find({ userId });
    console.log(currentUserId);

    if (!currentUserId.length) {
      return res.status(400).json({
        success: false,
        message: "User not loggedin",
      });
    }
    const response = currentUserId[0].userId;
    const userVerify = await user.findOne(response);
    const loginStatus = userVerify.isVerified;
    if (loginStatus) {
      if (currentUserId) {
        res.status(200).json({
          success: true,
          message: "data fetched success",
          data: currentUserId,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "User is not Logged In",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Note fetch failed",
    });
  }
};

//get one note based on note id
export const getOneNote = async (req, res) => {
  try {
    const id = req.params.id;
    const particularNote = await note.findById({ _id: id });
    if (particularNote) {
      res.status(200).json({
        success: true,
        message: "Note fetched success",
        particularNote,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: "server error",
      message: "User cant be fetched",
    });
  }
};

// update note based on note id

export const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const { title, content } = req.body;
    const searchNote = await note.findById(id);
    const searchUser = searchNote.userId;
    const findUser = await user.findById(searchUser);

    if (!findUser.isVerified) {
      res.status(400).json({
        success: false,
        message: "user not logged in",
      });
    }
    const updatedNote = await note.findByIdAndUpdate(
      { _id: id },
      { title, content }
    );
    res.status(200).json({
      success: true,
      message: "Note updated Success",
      data: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: "server error",
      message: "Note update failed",
    });
  }
};

// delete note based on note id

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteNote = await note.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Note Deleted Success",
      deleteNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Note Delete Failed",
    });
  }
};

// search by title or content but with particular userId

export const search = async (req, res) => {
  try {
    const { userId, searchText } = req.body; 

    if (!userId || !searchText) {
      return res.status(400).json({
        success: false,
        message: "userId and searchText are required.",
      });
    }

    const notes = await note.find({
      userId,
      $or: [
        { title: { $regex: searchText, $options: "i" } }, 
        { content: { $regex: searchText, $options: "i" } }, // options i means case insensitive matching
      ],
    });

    if (notes.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Notes fetched successfully.",
        notes,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No notes found.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// Get paginated notes
export const getPaginatedNotes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // 5 notes per page

    // Calculating the skip value
    const skip = (page - 1) * limit;

    // Getting notes with pagination
    const notes = await note
      .find()
      .skip(skip)
      .limit(limit)


    res.status(200).json({
      success: true,
      message : "Notes fetched as per query",
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: "Internal server error",
    });
  }
};
