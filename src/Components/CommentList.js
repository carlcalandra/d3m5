import React, { useEffect } from "react";
import SingleComment from "./SingleComment";

const CommentList = ({
  comments,
  token,
  setComments,
  totalCommentsNum,
  setActivePage,
  setRefresher,
  setIsDelete
}) => {
  const commentsEl = comments.map((comment) => (
    <SingleComment
      comment={comment}
      key={comment._id}
      token={token}
      setComments={setComments}
      setRefresher={setRefresher}
      setIsDelete={setIsDelete}
    />
  ));
  // useEffect(() => {
  //   if (comments.length === 0 && totalCommentsNum > 0) {
  //     setActivePage(lastPage);
  //   }
  // }, [comments]);
  return (
    <>
      {totalCommentsNum === 0 && (
        <p>No one commented this book. Be the first</p>
      )}
      {totalCommentsNum > 0 && commentsEl}
    </>
  );
};

export default CommentList;
