const validateRegistrationForm = (formData) => {
  let errors = {
    firstName: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  if (!formData.firstName || formData.firstName === "") {
    errors.firstName = "First name is required.";
  }

  if (!formData.username || formData.username === "") {
    errors.username = "Username is required.";
  }

  if (!formData.password || formData.password === "") {
    errors.password = "Password is required.";
  }

  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Passwords must match.";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  }

  return errors;
};

const validateLoginForm = (formData) => {
  let errors = {
    username: "",
    password: "",
  };

  if (!formData.username || formData.username === "") {
    errors.username = "Username is required.";
  }

  if (!formData.password || formData.password === "") {
    errors.password = "Password is required.";
  }

  return errors;
};

const validateAddNoteForm = (title, description) => {
  let errors = {};

  if (!title) {
    errors.title = "Title is required.";
  }

  if (!description) {
    errors.description = "Description is required.";
  }

  return errors;
};
export { validateRegistrationForm, validateLoginForm, validateAddNoteForm };
