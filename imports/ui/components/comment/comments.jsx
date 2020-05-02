import React from "react";
import _Comment from "./comment";

const Comments = ({ comments }) => {
  return (
    <>
      {comments.map((c, index) => {
        return <_Comment key={index} comment={c} />;
      })}
    </>
  );
};

export default Comments;
