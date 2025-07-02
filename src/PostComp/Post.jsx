import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BottomBar from "../BottomComponent/BottomBar";

import SubredditsList from "../redditApIComp/subredditsList";
import "../PostComp/postCss.css"; // Importing post-specific styles
import {
  allSubredditsSelected,
  fetchSubredditAutocomplete,
} from "../redditApIComp/subRedditSlice"; // selector for subreddit posts
import { selectAllComments } from "../ContentComponent/ContentSlice"; // selector for comments

import SubredditSelector from "../subredditSelectorComponent/SubredditSelector";
import RedditPostList from "../RedditPostComponent/RedditPostList";

const Post = ({ postIndex }) => {
  const dispatch = useDispatch();

  const subreddits = useSelector(allSubredditsSelected); // array of post data objects
  const comments = useSelector(selectAllComments); // array of { user, text }
  console.log(subreddits, comments);

  console.log(
    "Fetching comments for post:",
    Object.keys(subreddits),
    "associated values",
    Object.values(subreddits)
  );
  console.log(
    "Subreddit posts:",
    subreddits.map((sub) => sub.title).join(", ")
  );
  subreddits.forEach((sub, idx) => {
    console.log(`Posts #${idx}: ObjectKeys=${Object.keys(sub).join(
      ", "
    )}, title=${sub.title}
    `);
  });

  useEffect(() => {
    dispatch(fetchSubredditAutocomplete(""));
  }, [dispatch]);

  return (
    <div>
      <>
        <h2>Reddit Posts</h2>
      </>
      <>
        <img
          src={
            subreddits[0]?.icon_img
              ? subreddits[0].icon_img
              : "https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png"
          }
          alt="subreddit thumbnails"
        />
      </>
      <SubredditsList />
      <SubredditSelector />
      <RedditPostList />
      <BottomBar />
    </div>
  );
};

export default Post;
