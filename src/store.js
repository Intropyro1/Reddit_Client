import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./ContentComponent/ContentSlice";
import likesOrDislikesReducer from "./EngagementComponent/likesOrDislikesSlice";
import subRedditReducer from "../src/redditApIComp/subRedditSlice";
import redditReducer from "../src/redditApIComp/redditSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    likesOrDislikes: likesOrDislikesReducer,
    subReddit: subRedditReducer,
    redditPosts: redditReducer,
  },
});
export default store;
