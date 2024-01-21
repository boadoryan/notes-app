import React from "react";
import { useState, useEffect } from "react";
import { TextInput, TextAreaInput } from "../../components/TextInput";
import { ColorPicker } from "../../components/ColorPicker";
import { updateNote } from "../../api/notes";
import { TagSelector } from "../../components/TagSelector";
import Button from "../../components/Button";
const EditNote = ({
  title,
  content,
  id,
  accessToken,
  toggleEdit,
  fetchNotes,
  color,
  tags,
}) => {
  const userId = localStorage.getItem("userId");

  const [noteData, setNoteData] = useState({
    title: title,
    content: content,
    userOwner: userId,
    backgroundColor: color,
    tags: tags,
  });

  // Handle the save button
  // Sends the updated info to the selected note.
  const handleSave = async (e) => {
    e.preventDefault();

    const updatedData = {
      title: noteData.title,
      content: noteData.content,
      userOwner: noteData.userOwner,
      color: noteData.backgroundColor,
      tags: noteData.tags,
    };

    try {
      await updateNote(accessToken, updatedData, id, fetchNotes);
    } catch (err) {
      console.log(err);
    }
    toggleEdit();
  };

  // Handle the cancel button
  // Toggles form visibility
  // Resets all values
  const handleCancel = () => {
    toggleEdit();
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-4 ">
        <TextInput
          label={"Title"}
          formData={noteData}
          setFormData={setNoteData}
          fieldIdentifier={"title"}
        />
      </div>
      <TextAreaInput
        label={"Content"}
        formData={noteData}
        setFormData={setNoteData}
        fieldIdentifier={"content"}
      />
      <ColorPicker
        setBackgroundColor={setNoteData}
        backgroundColor={noteData.backgroundColor}
        inputKey={"backgroundColor"}
      />
      <TagSelector
        tags={noteData.tags}
        setTags={setNoteData}
        inputKey={"tags"}
      />
      <div className="self-end mt-4 items-center align-center flex gap-x-2">
        <Button
          type={"button"}
          onClick={handleCancel}
          label={"Cancel"}
          variant={"cancel"}
        />
        <Button
          type={"submit"}
          label={"Save"}
          variant={"submit"}
          onClick={(e) => handleSave(e)}
          isDisabled={!noteData.title || !noteData.content}
        />
      </div>
    </div>
  );
};

export default EditNote;
