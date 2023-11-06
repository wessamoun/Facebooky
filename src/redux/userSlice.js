import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../appwrite/api";
// First, create the thunk
export const getUser = createAsyncThunk("data/fetchData",async () => {
  try {
    
    const currentUser = await getCurrentUser()
    return currentUser
  } catch (error) {
    console.error(error);
  }
});

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};
const cookieFallback = localStorage.getItem("cookieFallback");

const initialState = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: cookieFallback === "[]" ||
  cookieFallback === null ||
  cookieFallback === undefined ? false : true,
};

// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    loggedIn: (state) => {
      state.isAuthenticated = true;
    },
    loggedOutAction: (state) => {
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getUser.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.user = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true
    });
    builder.addCase(getUser.rejected, (state) => {
      // Add user to the state array
      state.isLoading = false;
      state.isAuthenticated = false
    });
  },
});

export const { loggedIn, loggedOutAction } = userSlice.actions;

export default userSlice.reducer;
