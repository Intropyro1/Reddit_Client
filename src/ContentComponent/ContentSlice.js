import { createSlice, createSelector } from "@reduxjs/toolkit";
import { content } from "./content";

const initialState = {
  currentIndex: 0,
  contentIndex: 0,
  commentIndex: 0,
  contentList: content,
  selectedContentId: null, // This can be used to track the selected content ID;
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    changeContent: (state, action) => {
      state.currentIndex = action.payload;
    },
    setSelectedContentId: (state, action) => {
      state.selectedContentId = action.payload; // Set the selected content ID
    },
    nextComment: (state) => {
      const commentObj = state.contentList[state.contentIndex].comments[0];
      const commentKeys = Object.keys(commentObj);
      if (state.commentIndex < commentKeys.length - 1) {
        state.commentIndex += 1;
      }
    },
    prevComment: (state) => {
      if (state.commentIndex > 0) {
        state.commentIndex -= 1;
      }
    },
    nextContent: (state) => {
      if (state.contentIndex < state.contentList.length - 1) {
        state.contentIndex += 1;
        state.commentIndex += 1;
        state.currentIndex += 1; // Update currentIndex to match contentIndex
      } else {
        console.log("No more content available.");
      }
    },
    prevContent: (state) => {
      if (state.contentIndex > 0) {
        state.contentIndex -= 1;
        state.commentIndex -= 1;
        state.currentIndex -= 1;
      } else {
        console.log("No more content available.");
      }
    },
    setContentIndex: (state, action) => {
      state.contentIndex = action.payload;
      state.commentIndex = 0;
    },
    resetCommentIndex: (state) => {
      state.commentIndex = 0;
    },
    selectCommentsbyContentId: (state) => {
      const selectedContent = state.contentList.find(
        (content) => content.id === state.selectedContentId
      );
      if (selectedContent) {
        console.log("comments", selectedContent.comments);
        return selectedContent.comments;
      }
      return [];
    },
  },
});
export const {
  nextContent,
  prevContent,
  changeContent,
  setSelectedContentId,
  nextComment,
  prevComment,
  setContentIndex,
  resetCommentIndex,
  selectCommentsbyContentId,
} = contentSlice.actions;
export const selectCurrentContent = (state) =>
  state.content.contentList[state.content.currentIndex];

export const selectCurrentComment = (state) => {
  const { contentList, contentIndex, commentIndex } = state.comments;
  const commentObj = contentList[contentIndex].comments[0];
  const commentKeys = Object.keys(commentObj);
  const userKey = commentKeys[commentIndex];
  return { user: userKey, text: commentObj[userKey] };
};
export const selectContentState = (state) => state.content;

export const selectAllComments = createSelector(
  [selectContentState],
  (contentState) => {
    const { contentList, contentIndex } = contentState;
    const commentObj = contentList[contentIndex]?.comments[0] || {};
    return Object.entries(commentObj).map(([user, text]) => ({ user, text }));
  }
);

export default contentSlice.reducer;
