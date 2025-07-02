import { createSlice } from "@reduxjs/toolkit";
import { content } from "../ContentComponent/content";

const initialState = {
  contentIndex: 0,
  contentList: [],
  likes: {},
  dislikes: {},
};

const likesOrDislikesSlice = createSlice({
  name: "likesOrDislikes",
  initialState,
  reducers: {
    setContentList: (state, action) => {
      state.contentList = action.payload;
    },
    likeContent: (state, action) => {
      const contentId = action.payload;
      if (!state.likes[contentId]) {
        state.likes[contentId] = 0;
      }
      state.likes[contentId]++;
      console.log(
        "New like for content ID:",
        contentId,
        "Overall count:",
        state.likes
      );
    },
    dislikeContent: (state, action) => {
      const contentId = action.payload;
      if (!state.dislikes[contentId]) {
        state.dislikes[contentId] = 0;
      }
      console.log(
        "New like for content ID:",
        contentId,
        "Overall count:",
        state.likes
      );
      state.dislikes[contentId]++;
    },
  },
});

export const { setContentList, likeContent, dislikeContent } =
  likesOrDislikesSlice.actions;
export const selectContentList = (state) => state.likesOrDislikes.contentList;

export const selectLikes = (state) => state.likesOrDislikes.likes;
export const selectDislikes = (state) => state.likesOrDislikes.dislikes;
export const selectContentIndex = (state) => state.likesOrDislikes.contentIndex;

export const selectLikeCount = (state, contentId) =>
  state.likesOrDislikes.likes[contentId] || 0;

export const selectDislikeCount = (state, contentId) =>
  state.likesOrDislikes.dislikes[contentId] || 0;

export default likesOrDislikesSlice.reducer;

// This slice manages the likes and dislikes for content in the application.
// It allows for setting the content list, liking, and disliking content.
