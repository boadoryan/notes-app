import React from "react";
import { useState, useEffect } from "react";
import RegistrationForm from "../../components/RegistrationForm";
import { handleRegistration } from "../../api/notes";
import { validateRegistrationForm } from "../../utils/formUtils";
import { useNavigate } from "react-router-dom";

const Register = ({ setFormType }) => {
  const [serverErrors, setServerErrors] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const errors = validateRegistrationForm(formData);
    setErrors(errors);

    if (errors.confirmPassword !== "") return;

    try {
      const response = await handleRegistration(
        formData.username.toLowerCase(),
        formData.password,
        formData.firstName,
        setServerErrors
      );

      if (response.status == "200") {
        alert("Registration successful! Please Login.");
        navigate(0);
      }
    } catch (error) {
      console.log("Registration failed: ", error);
    }
  };

  return (
    <RegistrationForm
      onSubmit={onSubmit}
      formData={formData}
      errors={errors}
      serverErrors={serverErrors}
      setFormData={setFormData}
    />
  );
};

export default Register;
