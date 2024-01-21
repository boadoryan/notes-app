import React from "react";
import { useState } from "react";
export const ColorPicker = ({
  setBackgroundColor,
  backgroundColor,
  inputKey,
}) => {
  const colors = [
    {
      key: 0,
      colorName: "Pink",
      hexValue: "#FFD1DC",
    },
    {
      key: 1,
      colorName: "Blue",
      hexValue: "#CAE0FF",
    },
    {
      key: 2,
      colorName: "Green",
      hexValue: "#CAFFCA",
    },
    {
      key: 3,
      colorName: "Purple",
      hexValue: "#FFCAFF",
    },
    {
      key: 4,
      colorName: "Yellow",
      hexValue: "#FFFFCA",
    },
    {
      key: 5,
      colorName: "Orange",
      hexValue: "#FFE0CA",
    },
    {
      key: 6,
      colorName: "None",
      hexValue: "transparent",
    },
  ];

  const [selectedColor, setSelectedColor] = useState(backgroundColor);

  // Handle the radio buttons
  // Set the selected color to the parents background color
  // Set the selected color the selectedColor to determine checked value.
  const handleChange = (e) => {
    const selectedHexValue = e.target.value;
    setBackgroundColor((prevData) => ({
      ...prevData,
      [inputKey]: selectedHexValue,
    }));
    setSelectedColor(selectedHexValue);
  };

  return (
    <>
      <div className="my-4">
        <label className="font-bold">Color:</label>
        <ul className="flex gap-x-4 gap-y-2 flex-wrap">
          {colors.map((color) => (
            <li
              key={color.key}
              className="flex gap-2 items-center justify-center align-center text-sm"
            >
              <label htmlFor={`color-${color.key}`}>{color.colorName}</label>
              <input
                type="radio"
                id={`color-${color.key}`}
                name="colorPicker"
                value={color.hexValue}
                checked={selectedColor === color.hexValue}
                onChange={(e) => handleChange(e)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
