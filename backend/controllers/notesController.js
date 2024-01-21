import { NotesModel } from "../models/Notes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";
import jwt from "jsonwebtoken";

// Get all notes for a user.
const getNotesByUser = async (req, res) => {
  try {
    // Check if userId is available in the request, thanks to the verifyToken middleware
    if (!req.userId) {
      return res.status(401).json({ message: "asdfasdf" });
    }

    const allUsersNotes = await NotesModel.find({
      userOwner: req.userId,
    });

    res.json(allUsersNotes);
  } catch (err) {
    res.json(err);
  }
};

// Create a new note.
const createNewNote = async (req, res) => {
  const user = await UserModel.findOne({ username: req.username });
  try {
    const newNote = new NotesModel({
      ...req.body,
    });
    const response = await newNote.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

// Delete a note.
const deleteNote = async (req, res) => {
  try {
    const userID = req.body.userID;
    const noteID = req.params.id;

    const deletedNote = await NotesModel.findByIdAndRemove(noteID);

    if (!deletedNote) {
      return res.json({ message: "Failed to delete. Note was not deleted." });
    }

    res.json({ message: `Note with id: ${noteID} was deleted.` });
  } catch (err) {
    res.json(err);
  }
};

// Update a note.
const updateNote = async (req, res) => {
  try {
    const userID = req.body.userOwner;
    const noteID = req.params.id;

    const { title, content, userOwner, createdAt, color, tags } = req.body;

    const noteToUpdate = await NotesModel.findById(noteID);

    if (!noteToUpdate) return res.json({ message: "Note not found." });

    if (noteToUpdate.userOwner.toString() !== userID) {
      return res.json({
        message: "You are not authorized to update this note.",
      });
    }

    const updatedNote = await NotesModel.findByIdAndUpdate(
      noteID,
      {
        title: title,
        content: content,
        userOwner: userOwner,
        createdAt: createdAt,
        color: color,
        tags: tags,
      },
      {
        new: true,
      }
    );

    if (!updatedNote)
      return res.json({ message: "Note couldn't be updated. Try again." });

    res.json({ message: "success" });
  } catch (err) {
    res.json({ err });
  }
};

export default { getNotesByUser, createNewNote, deleteNote, updateNote };
