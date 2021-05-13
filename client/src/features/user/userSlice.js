import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import authService from "../../services/authService";

const initialState = {
  status: "idle",
  error: null,
  user: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await userService.getProfile();
  sessionStorage.setItem("isLoggedIn", true);
  return response.data;
});

export const editUser = createAsyncThunk("user/editUser", async (data) => {
  const response = await userService.update(data);
  return response.data;
});

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.signup(data);
      sessionStorage.setItem("isLoggedIn", true);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  await authService.logout();
  sessionStorage.removeItem("isLoggedIn");
  return {};
});

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authService.login(data);
      sessionStorage.setItem("isLoggedIn", true);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState;
    },
    setError: (state, action) => {
      state.error = action.payload;
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
      // state.error = action.payload;
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
    [signupUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = action.payload;
    },
    [signupUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.user = null;
    },
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.user = null;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.user = null;
    },
  },
});

export const { logout, setError } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
