import React from "react";
import { useEffect } from "react";

export const TagSelector = ({ tags, setTags, inputKey }) => {
  useEffect(() => {
    console.log(tags);
  }, [tags]);

  const availableTags = {
    1: "JavaScript",
    2: "HTML",
    3: "CSS",
    4: "React",
    5: "Node.js",
    6: "Angular",
    7: "Vue.js",
  };

  const handleAddTags = (e) => {
    if (tags.length > 3) return;
    const tagValue = e.target.value;
    if (tags.includes(tagValue)) {
      return;
    } else {
      // setTags((prevData) => [...prevData, tagValue]);
      setTags((prevData) => ({
        ...prevData,
        [inputKey]: [...tags, tagValue],
      }));
    }
  };

  const handleRemoveTag = (e) => {
    const tagValue = e.target.value;

    if (tags.includes(tagValue)) {
      const filteredTags = tags.filter((tag) => tag !== tagValue);
      setTags((prevData) => ({
        ...prevData,
        [inputKey]: filteredTags,
      }));
    } else {
      return;
    }
  };

  const handleClearTags = () => {
    setTags((prevData) => ({
      ...prevData,
      [inputKey]: [],
    }));
  };

  return (
    <>
      <div className="my-4">
        <label htmlFor="" className="font-bold">
          Tags: <span className="font-normal text-sm">Choose up to 4</span>
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(availableTags).map(([id, tag]) => (
            <ul className="" key={id}>
              <li
                className={` px-2 py-1 flex gap-x-1 rounded-full border-2 border-black text-xs ${
                  tags.includes(tag) ? "bg-yellow-200" : "bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={(e) => handleAddTags(e)}
                  value={tag}
                >
                  {tag}
                </button>
                <button
                  className=""
                  type="button"
                  value={tag}
                  onClick={(e) => handleRemoveTag(e)}
                >
                  {tags.includes(tag) ? "x" : ""}
                </button>
              </li>
            </ul>
          ))}
          <button
            type="button"
            className="text-xs hover:text-gray-500"
            onClick={handleClearTags}
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
};
