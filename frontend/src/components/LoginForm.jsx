import React from "react";
import Button from "./Button";
import { AuthTextInput, PasswordInput } from "./TextInput";
import { Form, FormHeader } from "../components/Form";

const LoginForm = ({
  onSubmit,
  formData,
  errors,
  serverErrors,
  setFormData,
}) => {
  return (
    <>
      <FormHeader text={"Login Form"} />
      <Form onSubmit={onSubmit} responsive={true}>
        <AuthTextInput
          formData={formData}
          errors={errors}
          serverErrors={serverErrors}
          setFormData={setFormData}
          fieldIdentifier={"username"}
          label={"Username"}
        />
        <PasswordInput
          formData={formData}
          errors={errors}
          serverErrors={serverErrors}
          setFormData={setFormData}
          fieldIdentifier={"password"}
          label={"Password"}
        />
        <Button type={"submit"} label={"Login"} variant={"submit"} />
      </Form>
    </>
  );
};

export default LoginForm;
