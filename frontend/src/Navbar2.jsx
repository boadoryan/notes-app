import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";

import Button from "./components/Button";
import axios from "axios";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsMobileNavOpen(false); // Close mobile nav when switching to larger screens
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <div className=" outline relative md:w-full md:flex md:items-center p-2">
      <div className="flex justify-between items-center py-1">
        <Link className="font-bold" to="/">
          Jotted.
        </Link>
        {/* <p
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="md:hidden hover:cursor-pointer"
        >
          {isMobileNavOpen ? "x" : "open nav"}
        </p> */}
        {!cookies.access_token ? (
          <div className="flex gap-x-6 items-center">
            <Link to="/auth">
              <Button label={"Register"} size={"sm"} />
            </Link>
            <Link to="/auth">
              <Button label={"Login"} variant={"submit"} size={"sm"} />
            </Link>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div>
              {isLoggedIn && (
                <Link to="/saved-notes">
                  <Button label={"My Notes"} size={"sm"} />
                </Link>
              )}
            </div>
            <Button
              onClick={handleLogout}
              label={"Log Out"}
              variant={"cancel"}
              size={"sm"}
              rounding={"full"}
            />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile ? (
        <div
          className={`absolute right-0 flex flex-col items-center justify-center gap-y-8 py-8 outline top-[42px] w-[80vw] h-[80vh] shadow bg-gray-100 ${
            isMobileNavOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/saved-notes">
            <Button label={"My Notes"} size={"sm"} />
          </Link>
          {!cookies.access_token ? (
            <Link to="/auth">
              <Button
                label={"Register / Login"}
                variant={"submit"}
                size={"sm"}
                rounding={"full"}
              />
            </Link>
          ) : (
            <Button
              onClick={handleLogout}
              label={"Log Out"}
              variant={"cancel"}
              size={"sm"}
              rounding={"full"}
            />
          )}
        </div>
      ) : (
        // Desktop menu
        <div className="w-full flex justify-end items-center static gap-x-4">
          {isLoggedIn && (
            <Link to="/saved-notes">
              <Button label={"My Notes"} size={"sm"} />
            </Link>
          )}
          {!cookies.access_token ? (
            <Link to="/auth">
              <Button
                label={"Register / Login"}
                size={"sm"}
                variant={"submit"}
                rounding={"full"}
              />
            </Link>
          ) : (
            <Button
              onClick={handleLogout}
              label={"Log Out"}
              variant={"cancel"}
              size={"sm"}
              rounding={"full"}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
