import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../EngagementComponent/likesOrDislikes.css"; // Importing styles for LikesOrDislikes component

import { setLike } from "../redditApIComp/redditSlice";
const LikesOrDislikes = ({ postId }) => {
  const dispatch = useDispatch();
  const likeStatus = useSelector(
    (state) => state.redditPosts.likes?.[postId] || null
  );
  const handleLike = () => {
    dispatch(setLike({ postId, value: "like" }));
  };
  const handleDislike = () => {
    dispatch(setLike({ postId, value: "dislike" }));
  };

  return (
    <div>
      <button
        className={`likeButton${likeStatus === "like" ? "selected" : ""}`}
        onClick={handleLike}
      >
        <span>👍</span>
      </button>
      <button
        className={`dislikeButton${likeStatus === "dislike" ? "selected" : ""}`}
        onClick={handleDislike}
      >
        <span>👎</span>
      </button>
    </div>
  );
};

export default LikesOrDislikes;
