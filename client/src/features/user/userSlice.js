import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state = action.payload;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.token;

export default userSlice.reducer;
