// subRedditSlice.js
import { selectPosts } from "./redditSlice";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
  subreddits: [],
  isLoading: false,
  error: false,
  searchTerm: "",
};

const subRedditSlice = createSlice({
  name: "subreddits",
  initialState,
  reducers: {
    startGetSubreddits(state) {
      state.isLoading = true;
      state.error = false;
    },
    getSubredditsSuccess(state, action) {
      state.isLoading = false;
      state.subreddits = action.payload;
    },
    getSubredditsFailed(state) {
      state.isLoading = false;
      state.error = true;
    },
    setSearchTerm(state, action) {
      console.log("Payload received:", action.payload);
      state.searchTerm = action.payload;
    },
  },
});

export const {
  startGetSubreddits,
  getSubredditsSuccess,
  getSubredditsFailed,
  setSearchTerm,
} = subRedditSlice.actions;

export default subRedditSlice.reducer;

export const getSubreddits = () => async (dispatch) => {
  dispatch(startGetSubreddits());
  try {
    const res = await fetch("/api/subreddits");
    const data = await res.json();
    dispatch(getSubredditsSuccess(data.data.children));
  } catch (error) {
    dispatch(getSubredditsFailed());
  }
};

export const allSubreddits = (state) =>
  (state.subreddits || []).map((sub) => sub.data);

export const selectSubreddits = (state) => state.subReddit.subreddits;

// This selector extracts unique subreddit info from the posts array
export const allSubredditsSelected = createSelector(
  [selectSubreddits],
  (subreddits) => {
    const seen = new Set();
    console.log(
      "Posts:",
      subreddits,
      "sbannerImageLink:",
      subreddits.data?.banner_img
    ); //Calling from JavaScript APi not subreeditAutocomplete
    return subreddits
      .map((sub) => ({
        id: sub.data?.id,
        display_name_prefixed: sub.data?.display_name_prefixed,
        title: sub.data?.title,
        subscribers: sub.data?.subscribers,
        banner_img: sub.data?.banner_img,
        selftext: sub.data?.selftext,
        icon_img: sub.data?.icon_img,
        images: sub.data?.children?.data?.preview?.images || [],
      }))
      .filter((sub) => {
        if (seen.has(sub.id)) return false;
        seen.add(sub.id);
        return true;
      });
  }
);

export const fetchSubredditAutocomplete = (query) => async (dispatch) => {
  dispatch(startGetSubreddits());
  try {
    const response = await fetch(
      `/api/subreddit_autocomplete?query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    // data.data.children contains subreddit suggestions
    dispatch(getSubredditsSuccess(data.data.children));
  } catch (error) {
    dispatch(getSubredditsFailed());
  }
};
