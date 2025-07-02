import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  error: false,
  isloading: false,
  searchTerm: "",
  selectedSubreddit: "r/pics/",
  likes: {},
};

const redditSlice = createSlice({
  name: "redditPosts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    startGetPosts(state) {
      state.isloading = true;
      state.error = false;
    },
    getPostsSuccess(state, action) {
      state.isloading = false;
      state.posts = action.payload;
    },
    getPostsFailed(state) {
      state.isloading = false;
      state.error = true;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
      state.searchTerm = "";
    },
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
    },
    startGetComments(state, action) {
      // If we're hiding comment, don't fetch the comments.
      state.posts[action.payload].showingComments =
        !state.posts[action.payload].showingComments;
      if (!state.posts[action.payload].showingComments) {
        return;
      }
      state.posts[action.payload].loadingComments = true;
      state.posts[action.payload].error = false;
    },
    getCommentsSuccess(state, action) {
      state.posts[action.payload.index].loadingComments = false;
      state.posts[action.payload.index].comments = action.payload.comments;
    },
    getCommentsFailed(state, action) {
      state.posts[action.payload].loadingComments = false;
      state.posts[action.payload].error = true;
    },
    setLike(state, action) {
      const { postId, value } = action.payload;
      state.likes[postId] = value;
    },
  },
});

export const {
  setPosts,
  getPostsFailed,
  getPostsSuccess,
  startGetPosts,
  setSearchTerm,
  setSelectedSubreddit,
  toggleShowingComments,
  getCommentsFailed,
  getCommentsSuccess,
  startGetComments,
  setLike,
} = redditSlice.actions;

export default redditSlice.reducer;

export const selectPosts = (state) => state.redditPosts.posts;

export const selectCommentsForPost = (postIndex) =>
  createSelector([selectPosts], (posts) => posts[postIndex]?.comments || []);

export const selectAllApiComments = createSelector([selectPosts], (posts) =>
  posts.flatMap((post) => post.comments || [])
);

export const fetchPosts =
  (subreddit = "javascript") =>
  async (dispatch) => {
    try {
      dispatch(startGetPosts());
      const response = await fetch(`/api/r/${subreddit}`);
      const data = await response.json();
      // Extract posts array from Reddit API response
      const posts = data.data.children.map((child) => ({
        ...child.data,
        comments: [],
        showingComments: false,
        loadingComments: false,
        error: false,
        thumbnail: child.data.thumbnail.startsWith("http")
          ? child.data.thumbnail
          : "https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-57x57.png",
      }));
      dispatch(getPostsSuccess(posts));
      return posts; // Return posts for further use if needed
    } catch (error) {
      try {
        dispatch(getPostsFailed());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
  };
