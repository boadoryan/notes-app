import React from "react";
import Note from "./Note";

const NotesList = ({ notes, accessToken, fetchNotes }) => {
  return (
    <div className="my-12">
      <p className="mb-4">Your notes: ({notes.length})</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            id={note._id}
            className={`border-2 border-black rounded p-4 flex flex-col shadow-md`}
            style={{ backgroundColor: `${note.color}` }}
          >
            <Note
              title={note.title}
              id={note._id}
              content={note.content}
              createdAt={note.createdAt}
              updatedAt={note.updatedAt}
              accessToken={accessToken}
              fetchNotes={fetchNotes}
              color={note.color}
              tags={note.tags}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
