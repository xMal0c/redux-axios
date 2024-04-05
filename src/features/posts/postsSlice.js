import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(BASE_URL);
  const data = await response.data;
  return data;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    if (response.status === 200) {
      return id;
    } else {
      return `${response.status} - ${response.statusText}`;
    }
  } catch (error) {
    return error.message;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        if (id) {
          const updatedPosts = state.posts.filter((post) => post.id !== id);
          state.posts = updatedPosts;
        }
      });
  },
});

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts.posts;
