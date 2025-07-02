// Example: src/components/SubredditsList.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubreddits,
  allSubredditsSelected,
  selectSubreddits,
  fetchSubredditAutocomplete,
  setSearchTerm,
} from "./subRedditSlice";
import { fetchPosts } from "./redditSlice";

function SubredditsList() {
  const dispatch = useDispatch();
  const subreddits = useSelector(allSubredditsSelected);
  const searchTerm = useSelector((state) => state.subReddit.searchTerm);

  const handleUserInput = (e) => {
    console.log("User input:", e.target.value);
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSubredditSearch = () => {
    dispatch(fetchSubredditAutocomplete(searchTerm));
  };

  useEffect(() => {
    if (!subreddits.length) {
      dispatch(fetchSubredditAutocomplete(searchTerm));
    }
  }, [dispatch, subreddits.length]);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          id="searchBar"
          value={searchTerm}
          onChange={handleUserInput}
        />
        <button onClick={handleSubredditSearch}>Search Subreddits</button>
      </form>
    </>
  );
}

export default SubredditsList;
