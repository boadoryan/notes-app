import axios from "axios";

// https://notes-app-api-eta.vercel.app/

// Create a secure fetch request to the server using a bearer token.
const fetchSecureRequest = async (accessToken) => {
  return await axios.get("http://localhost:5555/notes", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

// Get a new access token from the server.
const fetchNewAccessTokenRequest = async () => {
  try {
    const refreshResponse = await axios.get(
      "http://localhost:5555/auth/refresh",
      {
        withCredentials: true,
      }
    );
    return refreshResponse.data.accessToken;
  } catch (error) {
    console.log("Error refreshing access token:", error);
    return null;
  }
};

// Handle registration.
const handleRegistration = async (
  username,
  password,
  firstName,
  setServerErrors
) => {
  try {
    const response = await axios.post("http://localhost:5555/auth/register", {
      username,
      password,
      firstName,
    });
    return response;
  } catch (error) {
    setServerErrors(error.response.data.errors);
    console.log("ERROR", error.response.data.errors);
  }
};

// Handle logout.
const handleLogout = async () => {
  try {
    await axios.post("http://localhost:5555/auth/logout", {
      withCredentials: true,
    });
    window.localStorage.clear("userId");
    return true;
  } catch (error) {
    console.log("Error logging out:", error);
    return false;
  }
};

// Handle deleting a note with noteId and accessToken.
// Then refetch notes.
const deleteNote = async (id, accessToken, fetchNotes) => {
  try {
    await axios.delete(`http://localhost:5555/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    fetchNotes();
  } catch (err) {
    console.log(err);
  }
};

// Handle adding a note with accessToken and user data from front end.
// Then refetch notes.
const addNote = async (accessToken, formData, fetchNotes) => {
  await axios.post(
    "http://localhost:5555/notes",
    formData, // Remove the surrounding object
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  fetchNotes();
};

// Handle updating a note with the accessToken, user data from front end, and the note ID.
// Then refetch notes.
const updateNote = async (accessToken, formData, id, fetchNotes) => {
  try {
    await axios.put(`http://localhost:5555/notes/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    fetchNotes();
  } catch (err) {
    console.log(err);
  }
};

export {
  addNote,
  deleteNote,
  updateNote,
  handleLogout,
  fetchNewAccessTokenRequest,
  fetchSecureRequest,
  handleRegistration,
};
