import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import authService from "../../services/authService";

const initialState = {
  status: "idle",
  error: null,
  user: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await userService.profile();
  return response.data;
});

export const editUser = createAsyncThunk("user/editUser", async (data) => {
  console.log(data);
  const response = await userService.update(data);
  return response.data;
});

export const signout = createAsyncThunk("user/signout", async () => {
  await authService.signout();
  return {};
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [editUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [editUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = action.payload;
    },
    [editUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [signout.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = null;
    },
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
