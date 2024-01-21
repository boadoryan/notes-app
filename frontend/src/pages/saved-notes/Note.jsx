import React, { useState, useRef, useEffect } from "react";
import EditNote from "../create-note/EditNote";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { deleteNote } from "../../api/notes";
import Button from "../../components/Button";

const Note = ({
  title,
  id,
  content,
  createdAt,
  accessToken,
  fetchNotes,
  color,
  tags,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const contentRef = useRef(null);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.scrollHeight > contentRef.current.clientHeight) {
        setIsOverflowing(true);
      }
    }
  }, [content]);

  return (
    <>
      {!isEditing ? (
        <div className=" flex flex-col">
          <div className="flex justify-between mt-2">
            {/* Title */}

            <div className="font-bold text-3xl md:text-2xl truncate">
              {title}
            </div>

            {/* Edit / Delete  */}
            <div className="flex gap-4">
              <Button
                onClick={() => deleteNote(id, accessToken, fetchNotes)}
                label={<FaTrash className="hover:text-red-500" />}
                variant={"icon"}
              />
              <Button
                onClick={toggleEdit}
                label={<FaPencil className="hover:text-blue-500" />}
                variant={"icon"}
              />
            </div>
          </div>

          {/* Tags */}
          <div className={`flex flex-wrap gap-2 mt-4 `}>
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <div className="flex" key={index}>
                  <p className=" px-2 py-1 flex gap-x-1 rounded-full  text-xs border-2 border-black">
                    {tag}
                  </p>
                </div>
              ))
            ) : (
              <p className=" px-2 py-1 flex gap-x-1 rounded-full text-xs border-2 border-black">
                No tags added
              </p>
            )}
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className={` my-4 whitespace-pre-line text-lg md:text-base  ${
              isShowMore
                ? "h-auto overflow-y-auto"
                : "max-h-[120px] min-h-[120px] overflow-y-hidden"
            }`}
            style={{ wordWrap: "break-word" }}
          >
            {content}
          </div>

          {/* Show More Button  */}
          <Button
            variant={"showMore"}
            onClick={() => setIsShowMore(!isShowMore)}
            label={isShowMore ? "Show Less" : "Show More"}
            overflow={isOverflowing}
          />

          {/* Created AT  */}
          <div className=" self-end text-sm my-2">
            {createdAt.toString().split("T")[0]}
          </div>
        </div>
      ) : (
        <EditNote
          toggleEdit={toggleEdit}
          title={title}
          content={content}
          id={id}
          accessToken={accessToken}
          fetchNotes={fetchNotes}
          color={color}
          tags={tags}
        />
      )}
    </>
  );
};

export default Note;
