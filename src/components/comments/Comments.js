import { useState, useEffect,useCallback } from "react";
import { useParams } from "react-router";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import CommentList from "./CommentsList";
import { getAllComments } from "../../lib/lib/api";
import useHttp from "../../hooks/hooks/use-http";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { quoteId } = params;
  const {
    sendRequest,
    data: loadComments,
    status,
    error,
  } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  },[sendRequest,quoteId]);
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  
  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && (loadComments && loadComments.length > 0)) {
    comments = <CommentList comments={loadComments} />;
  }
  if (status === "completed" && (!loadComments || loadComments.length == 0)) {
    comments = <p>No comments Found</p>;
  }
  const addCommentHandler = useCallback(() => {
    // setIsAddingComment(false);
    sendRequest(quoteId )
  },[sendRequest,quoteId]);
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddComment={addCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
