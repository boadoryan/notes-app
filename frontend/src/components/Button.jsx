import React from "react";

const Button = ({
  label,
  onClick,
  variant,
  type,
  overflow,
  isDisabled,
  size,
}) => {
  const buttonStyle = {
    styles: {
      primary:
        "border-2 rounded px-3 py-1 border-black bg-white hover:bg-gray-300",
      cancel:
        "border-2 rounded px-3 py-1 border-black bg-white hover:bg-red-400 ",
      submit: `border-2 rounded px-3 py-1 border-black bg-white hover:bg-sky-300 ${
        isDisabled ? "opacity-25 cursor-not-allowed hover:bg-white" : ""
      }`,
      showMore: `text-sm text-blue-800 text-left ${
        overflow ? "block" : "invisible"
      }`,
      auth: "border-2 rounded px-5 py-1 border-black bg-white hover:bg-black hover:text-white hover:border-white",
    },
    sizes: {
      xs: "text-xs ",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
  };

  const style = `
  ${buttonStyle.styles[variant] || ""} 
  ${buttonStyle.sizes[size] || ""} 
  `;

  return (
    <button
      onClick={onClick}
      className={style}
      type={type}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default Button;
