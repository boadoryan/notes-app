import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useApi = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const response = await fetchSecureRequest(cookies.access_token);
      setNotes(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);

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

  const fetchSecureRequest = async (token) => {
    return await axios.get("http://localhost:5555/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

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

  const handleLogout = async (route) => {
    try {
      await axios.post(
        "http://localhost:5555/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setCookies("access_token", "");
      setCookies("expires_in", "");
      window.localStorage.clear("userId");
      navigate(`/${route}`);
      return true;
    } catch (error) {
      console.log("Error logging out:", error);
      return false;
    }
  };

  const deleteNote = async (id, token) => {
    try {
      await axios.delete(`http://localhost:5555/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [cookies.access_token]);

  return {
    notes,
    loading,
    deleteNote,
  };
};

export default useApi;
