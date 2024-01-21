import React from "react";

const InputError = ({ error }) => {
  return <p className="text-red-500 text-sm self-start">{error}</p>;
};

export default InputError;
