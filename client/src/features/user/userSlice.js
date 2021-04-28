import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

const initialState = {
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await userService.profile();
  return response.data;
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
      state.user = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
