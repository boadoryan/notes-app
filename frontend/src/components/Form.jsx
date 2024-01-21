import React from "react";

export const Form = ({ onSubmit, children, responsive }) => {
  let formStyles = `flex flex-col`;

  if (responsive) {
    formStyles += ` justify-center items-center w-[370px] md:w-[500px] my-10 px-4 py-8 rounded border-2 border-black`;
  }
  return (
    <form className={formStyles} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export const FormHeader = ({ text }) => {
  return <h2 className="font-bold text-3xl text-center">{text}</h2>;
};
