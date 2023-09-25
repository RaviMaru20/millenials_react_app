import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (action.payload.picturePath) {
        state.user.picturePath = action.payload.picturePath;
      }
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    deletePost: (state, action) => {
      const postIdToDelete = action.payload.postId;
      // Filter out the deleted post from the state
      state.posts = state.posts.filter((post) => post._id !== postIdToDelete);
    },
    setProfilePicture: (state, action) => {
      if (state.user) {
        state.user.picturePath = action.payload.picturePath;
      } else {
        console.error("User not logged in.");
      }
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  deletePost,
  setProfilePicture,
} = authSlice.actions;
export default authSlice.reducer;
