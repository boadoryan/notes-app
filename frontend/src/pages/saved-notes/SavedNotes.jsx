import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import CreateNote from "../create-note/CreateNote";
import NotesList from "./NotesList";
import Button from "../../components/Button";

import {
  handleLogout,
  fetchNewAccessTokenRequest,
  fetchSecureRequest,
} from "../../api/notes";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(null);
  const [cookies, setCookies] = useCookies(["access_token"]);

  const [showAddNoteForm, setShowAddNoteForm] = useState(false);

  const firstName = localStorage.getItem("first_name");

  // Fetch the current users notes with the access token.
  // If it responds with a 401, get a new access token.
  const fetchNotes = async () => {
    try {
      const response = await fetchSecureRequest(cookies.access_token);
      setNotes(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);

      if (err.response.status === 401) {
        const newAccessToken = await fetchNewAccessTokenRequest();

        if (newAccessToken) {
          setCookies("access_token", newAccessToken);
          const newFetchRequest = await fetchNewAccessTokenRequest();
          setNotes(newFetchRequest.data);
        } else {
          console.log("couldnt refresh access token");
          handleLogout("auth");
        }
      }
    }
  };

  // Toggle the add note form.
  const handleShowAddNoteForm = () => {
    setShowAddNoteForm(!showAddNoteForm);
  };

  // Rerender and call fetchNotes if the access token has changed (expired).
  useEffect(() => {
    fetchNotes();
  }, [cookies.access_token]);

  return (
    <div className="mx-4 mt-8 lg:mt-12 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-20 min-h-screen">
      <div className="lg:flex lg:flex-row lg:justify-between lg:items-center">
        <h1 className="font-bold text-3xl mb-8 lg:mb-0 ">
          Welcome, {firstName}
        </h1>
        {!showAddNoteForm && (
          <Button
            type={"button"}
            label={"Add Note ( + )"}
            variant={"submit"}
            onClick={handleShowAddNoteForm}
          />
        )}
      </div>
      {showAddNoteForm && (
        <CreateNote
          fetchNotes={fetchNotes}
          handleShowAddNoteForm={handleShowAddNoteForm}
        />
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="">
          {notes.length === 0 && !showAddNoteForm ? (
            <div className="flex align-center justify-center flex-col items-center  min-h-[320px]">
              <p className="text-3xl">You currently have 0 notes.</p>
              <p className="text-xl font-bold my-4">Start adding notes now!</p>
              {!showAddNoteForm && (
                <Button
                  type={"button"}
                  label={"Add Note ( + )"}
                  variant={"submit"}
                  onClick={handleShowAddNoteForm}
                />
              )}
            </div>
          ) : (
            <NotesList
              notes={notes}
              accessToken={cookies.access_token}
              fetchNotes={fetchNotes}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SavedNotes;
