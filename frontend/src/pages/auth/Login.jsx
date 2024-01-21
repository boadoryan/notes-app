import React from "react";
import LoginForm from "../../components/LoginForm";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { validateLoginForm } from "../../utils/formUtils";

const Login = () => {
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [serverErrors, setServerErrors] = useState({});
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // handle the login submission form
  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = validateLoginForm(formData);
    setErrors(errors);

    try {
      const response = await axios.post(
        // "https://notes-app-api-eta.vercel.app/auth/login",
        "http://localhost:5555/auth/login",
        {
          username: formData.username,
          password: formData.password,
        },
        { withCredentials: true, credentials: "include" }
      );

      if (response.data.accessToken && response.data.userId) {
        setCookie("access_token", response.data.accessToken);
        setCookie("expires_in", response.data.userId);
        localStorage.setItem("first_name", response.data.firstName);
        localStorage.setItem("userId", response.data.userId);
        navigate("/");
        alert("You are now logged in.");
      } else {
        alert("Invalid login credentials. Please try again.");
      }
    } catch (error) {
      setServerErrors(error.response.data.errors);
    }
  };

  return (
    <LoginForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      errors={errors}
      serverErrors={serverErrors}
    />
  );
};

export default Login;
