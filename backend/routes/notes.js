import express from "express";
import mongoose from "mongoose";
import notesController from "../controllers/notesController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.use(verifyToken);

// Route to get all the notes of a specific user.
router.route("/").get(notesController.getNotesByUser);

// Route to create a new note.
router.route("/").post(notesController.createNewNote);

// Route to delete a note.
router.route("/:id").delete(notesController.deleteNote);

// Route to update a note.
router.route("/:id").put(notesController.updateNote);

export { router as notesRouter };
