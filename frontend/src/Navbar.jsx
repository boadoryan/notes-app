import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Button from "./components/Button";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token", "userId"]);

  const isLoggedIn = cookies.access_token ? true : false;

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        // "https://notes-app-api-eta.vercel.app/auth/logout",
        "http://localhost:5555/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 204) {
        setCookies("access_token", "");
        setCookies("expires_in", "");
        window.localStorage.clear("userId");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative py-3 px-2 md:px-8 border-b-2 border-black">
      <div className="w-full flex justify-between items-center static">
        <Link className="font-bold" to="/">
          Notes.
        </Link>
        {isLoggedIn && (
          <Link to="/saved-notes">
            <Button label={"My Notes"} size={"sm"} />
          </Link>
        )}
        {!cookies.access_token ? (
          <Link to="/auth">
            <Button
              label={"Register / Sign In"}
              size={"xs"}
              variant={"submit"}
            />
          </Link>
        ) : (
          <Button
            onClick={handleLogout}
            label={"Sign Out"}
            variant={"cancel"}
            // size={!isMobile ? "sm" : "xs"}
            size={"xs"}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
