import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    color: { type: String, required: true },
    tags: { type: [String] },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    createdAt: { type: Date },
  },
  { timestamps: true }
);

export const NotesModel = mongoose.model("notes", NotesSchema);
