import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type User = {
  name: string;
};

export type AuthStateType = {
  signedIn: boolean | null;
  user: User | null;
};

const initialState: AuthStateType = {
  signedIn: null,
  user: null,
};

export const auth = createAsyncThunk<User | null>("auth/auth", async () => {
  try {
    const userCache = localStorage.getItem("user");
    return userCache ? JSON.parse(userCache) : null;
  } catch (e) {
    console.log(e);
    return null;
  }
});

export const login = createAsyncThunk<User | null, string>(
  "auth/login",
  async (name) => {
    try {
      const user = { name };
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
);

export const logout = createAsyncThunk<void, void>("auth/logout", async () => {
  try {
    localStorage.removeItem("user");
  } catch (e) {
    console.log(e);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(auth.fulfilled, (state, action) => {
      if (action.payload) {
        state.signedIn = true;
        state.user = action.payload;
      } else {
        state.signedIn = false;
        state.user = null;
      }
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.signedIn = true;
        state.user = action.payload;
      }
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.signedIn = false;
      state.user = null;
    });
  },
});

export const authReducer = authSlice.reducer;
