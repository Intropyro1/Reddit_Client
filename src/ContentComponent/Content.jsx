import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectAllComments,
  resetCommentIndex,
} from "../ContentComponent/ContentSlice.js";
import { setSelectedContentId } from "../ContentComponent/ContentSlice";
import {
  selectSubreddits,
  allSubreddits,
  allSubredditsSelected,
  fetchSubreddits,
} from "../redditApIComp/subRedditSlice.js";

const Content = () => {
  const [redditContent, setRedditContent] = useState([]);

  const dispatch = useDispatch();
  const contentIndex = useSelector((state) => state.content.currentIndex);
  const contentId = useSelector(
    (state) => state.content.contentList[state.content.currentIndex].id
  );

  const allComments = useSelector(selectAllComments);

  const [displayAllComments, setDisplayAllComments] = useState(false);

  useEffect(() => {
    dispatch(setSelectedContentId(contentId));
  }, [contentId, dispatch]);
  useEffect(() => {
    dispatch(resetCommentIndex());
  }, [contentIndex, dispatch]);
  useEffect(() => {
    dispatch(fetchSubreddits());
  }, [dispatch]);

  const subreddits = useSelector(allSubredditsSelected);

  return (
    <div>
      <>
        <>
          <strong>All Comments:</strong>
        </>
        {displayAllComments ? (
          <>
            <ul>
              {allComments.map((comment, index) => (
                <li key={index}>
                  <strong>{comment.user}</strong>
                  <span>{comment.text}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setDisplayAllComments(false)}>
              Show No Comments{" "}
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setDisplayAllComments(true)}>
              Show All Comments
            </button>
          </>
        )}
      </>
      <>
        <p>Possible Image data below</p>
        <span>{subreddits}</span>
        <span>
          {subreddits.map((sub) => (
            <img src={sub.data.icon_img} alt="" key={sub.data.id} />
          ))}
        </span>
      </>
    </div>
  );
};

export default Content;
