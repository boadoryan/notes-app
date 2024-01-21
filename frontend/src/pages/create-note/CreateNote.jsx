import React from "react";
import { useState, useEffect } from "react";
import { TextInput, TextAreaInput } from "../../components/TextInput";
import { useCookies } from "react-cookie";
import { ColorPicker } from "../../components/ColorPicker";
import { TagSelector } from "../../components/TagSelector";
import { addNote } from "../../api/notes";
import { Form } from "../../components/Form";
import Button from "../../components/Button";

const CreateNote = ({ fetchNotes, handleShowAddNoteForm }) => {
  const [errors, setErrors] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userId = localStorage.getItem("userId");

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
    userOwner: userId,
    backgroundColor: "transparent",
    tags: [],
  });

  const handleSubmit = async (e) => {
    if (errors.length > 0) return;

    e.preventDefault();

    const formData = {
      title: noteData.title,
      content: noteData.content,
      userOwner: noteData.userOwner,
      color: noteData.backgroundColor,
      tags: noteData.tags,
    };

    try {
      await addNote(cookies.access_token, formData, fetchNotes);
      handleShowAddNoteForm();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form>
        <TextInput
          label={"Title"}
          formData={noteData}
          setFormData={setNoteData}
          fieldIdentifier={"title"}
        />
        <TextAreaInput
          label={"Content"}
          formData={noteData}
          setFormData={setNoteData}
          fieldIdentifier={"content"}
        />
        <ColorPicker
          backgroundColor={noteData.backgroundColor}
          setBackgroundColor={setNoteData}
          inputKey={"backgroundColor"}
        />
        <TagSelector
          tags={noteData.tags}
          setTags={setNoteData}
          inputKey={"tags"}
        />
        <div className="self-end flex gap-x-2">
          <Button
            type={"button"}
            label={"Cancel"}
            variant={"cancel"}
            onClick={handleShowAddNoteForm}
          />
          <Button
            type={"submit"}
            label={"Submit"}
            variant={"submit"}
            onClick={handleSubmit}
            isDisabled={!noteData.title || !noteData.content}
          />
        </div>
      </Form>
    </>
  );
};

export default CreateNote;
