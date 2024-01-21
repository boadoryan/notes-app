import React from "react";
import { AuthTextInput, PasswordInput } from "./TextInput";
import { Form, FormHeader } from "../components/Form";
import Button from "./Button";
const RegistrationForm = ({
  onSubmit,
  formData,
  errors,
  serverErrors,
  setFormData,
}) => {
  return (
    <>
      <FormHeader text={"Registration Form"} />
      <Form onSubmit={onSubmit} responsive={true}>
        <AuthTextInput
          formData={formData}
          errors={errors}
          serverErrors={serverErrors}
          setFormData={setFormData}
          fieldIdentifier={"firstName"}
          label={"First Name"}
        />

        {/* Username Input */}
        <AuthTextInput
          formData={formData}
          errors={errors}
          serverErrors={serverErrors}
          setFormData={setFormData}
          fieldIdentifier={"username"}
          label={"Username"}
        />

        {/* Password Input */}
        <PasswordInput
          formData={formData}
          errors={errors}
          serverErrors={serverErrors}
          setFormData={setFormData}
          fieldIdentifier={"password"}
          label={"Password"}
        />

        {/* Confirm Password Input  */}
        <PasswordInput
          formData={formData}
          errors={errors}
          serverErrors={serverErrors}
          setFormData={setFormData}
          fieldIdentifier={"confirmPassword"}
          label={"Confirm Password"}
        />

        {/* Register Button  */}
        <div className="mt-4">
          <Button type={"submit"} label={"Register"} variant={"submit"} />
        </div>
      </Form>
    </>
  );
};

export default RegistrationForm;
