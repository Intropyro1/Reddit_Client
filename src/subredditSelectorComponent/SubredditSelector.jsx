// SubredditSelector.jsx
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchPosts } from "../redditApIComp/redditSlice";
import { allSubredditsSelected } from "../redditApIComp/subRedditSlice";
import "../subredditSelectorComponent/subredditSelectorStyles.css"; // Importing styles for SubredditSelector

const SubredditSelector = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(allSubredditsSelected);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    const handleOptionChange = (e) => {
      const subreddit = e.target.value.replace(/^r\//, "");
      dispatch(fetchPosts(subreddit));
    };

    return (
      <select
        onChange={handleOptionChange}
        id="mobile-display"
        style={{ width: "100px", margin: "50px" }}
        defaultValue=""
      >
        {subreddits.map((item) => (
          <option key={item.id} value={item.display_name_prefixed}>
            {item.display_name_prefixed}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className="subreddit-selector-sideBar">
      <h3 className="subreddit-selector-title">Choose a Subreddit</h3>
      <ul className="subreddit-selector-list">
        {subreddits.map((sub) => (
          <li key={sub.id} className="subreddit-selector-item">
            <button
              onClick={() =>
                dispatch(
                  fetchPosts(sub.display_name_prefixed.replace(/^r\//, ""))
                )
              }
            >
              {sub.display_name_prefixed}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubredditSelector;
