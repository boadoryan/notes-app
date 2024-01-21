/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import InputError from "./InputError";

// Handles the onChange event for form inputs.
const handleFormDataUpdate = (e, keyValue, formData, setFormData) => {
  e.preventDefault();
  setFormData({
    ...formData,
    [keyValue]: e.target.value,
  });
};

// Default text input.
export const TextInput = ({
  formData,
  setFormData,
  fieldIdentifier,
  label,
}) => {
  return (
    <div className="text-black rounded">
      <label className="font-bold" htmlFor={`note${fieldIdentifier}`}>
        {label}
      </label>
      <input
        className="w-full rounded font-bold text-2xl lg:text-lg px-2 py-1 mb-2 border-2 border-black"
        id={`note${fieldIdentifier}`}
        value={formData[fieldIdentifier]}
        name={`note${fieldIdentifier}`}
        type="text"
        onChange={(e) =>
          handleFormDataUpdate(e, fieldIdentifier, formData, setFormData)
        }
      />
    </div>
  );
};

// Default text area input.
export const TextAreaInput = ({
  formData,
  setFormData,
  fieldIdentifier,
  label,
}) => {
  return (
    <>
      <div className="text-black rounded">
        <label htmlFor={`note${fieldIdentifier}`} className="font-bold">
          {label}
        </label>
        <textarea
          className="w-full h-48 rounded border-2 border-black resize-none p-2 overflow-x-hidden break-all"
          rows="8"
          value={formData[fieldIdentifier]}
          cols="8"
          name={`note${fieldIdentifier}`}
          id={`note${fieldIdentifier}`}
          // maxLength="120"
          onChange={(e) =>
            handleFormDataUpdate(e, fieldIdentifier, formData, setFormData)
          }
        ></textarea>
      </div>
    </>
  );
};

// Text input for auth fields to validate both backend and frontend errors.
export const AuthTextInput = ({
  formData,
  errors,
  serverErrors,
  setFormData,
  fieldIdentifier,
  label,
}) => {
  return (
    <div className="my-2 w-full">
      <label htmlFor={fieldIdentifier}>{label}</label>
      <br />
      <input
        type="text"
        id={fieldIdentifier}
        name={fieldIdentifier}
        value={formData.fieldIdentifier}
        className=" w-full p-1.5 border-2 border-black rounded"
        onChange={(e) =>
          handleFormDataUpdate(e, fieldIdentifier, formData, setFormData)
        }
      />
      <InputError
        error={
          fieldIdentifier === "username"
            ? (errors && errors[fieldIdentifier]) ||
              (serverErrors && serverErrors.isExistingUser) ||
              ""
            : (errors && errors[fieldIdentifier]) || ""
        }
      />
    </div>
  );
};

// Password input
export const PasswordInput = ({
  formData,
  errors,
  serverErrors,
  setFormData,
  fieldIdentifier,
  label,
}) => {
  const [toggleShowPassword, setToggleShowPassword] = useState(false);

  const handleShowPasswordToggle = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  return (
    <>
      <div className="my-2 w-full flex flex-col">
        <label htmlFor={fieldIdentifier}>{label}</label>
        <input
          type={toggleShowPassword ? "text" : "password"}
          id={fieldIdentifier}
          name={fieldIdentifier}
          value={formData.fieldIdentifier}
          className="border w-full p-1.5 my-1.5 border-2 border-black rounded"
          onChange={(e) =>
            handleFormDataUpdate(e, fieldIdentifier, formData, setFormData)
          }
        />
        <PasswordToggle
          serverErrors={serverErrors}
          handleShowPasswordToggle={handleShowPasswordToggle}
          errors={errors}
          fieldIdentifier={fieldIdentifier}
        />
      </div>
    </>
  );
};

export const InputContainer = ({ children }) => {
  return (
    <div className="border w-[500px] p-6 flex flex-col items-center">
      {children}
    </div>
  );
};

// View password toggler
export const PasswordToggle = ({
  serverErrors,
  handleShowPasswordToggle,
  errors,
  fieldIdentifier,
}) => {
  return (
    <div className="flex justify-between">
      <InputError
        error={
          (errors && errors[fieldIdentifier]) ||
          (serverErrors && serverErrors[fieldIdentifier]) ||
          (fieldIdentifier === "confirmPassword" &&
            errors &&
            errors[fieldIdentifier])
        }
      />

      <div className="flex items-center self-end">
        <label htmlFor="passwordToggle" className="mr-2 text-sm">
          Show Password
        </label>
        <input
          type="checkbox"
          name="passwordToggle"
          onChange={handleShowPasswordToggle}
        />
      </div>
    </div>
  );
};
