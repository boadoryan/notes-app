import React from "react";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [formType, setFormType] = useState("login");

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {formType === "login" ? <Login /> : <Register />}
      {formType == "login" ? (
        <div className="text-center">
          <p>
            Don't have an account ?{" "}
            <span className="font-bold">
              <a href="#" onClick={() => setFormType("register")}>
                Register now
              </a>
            </span>
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p>
            Already have an account ?{" "}
            <span className="font-bold">
              <a href="#" onClick={() => setFormType("login")}>
                Back to login
              </a>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Auth;
