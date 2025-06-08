// src/features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// Load users from localStorage
const loadUsers = () => JSON.parse(localStorage.getItem("users")) || [];

// Save users to localStorage
const saveUsers = (users) =>
  localStorage.setItem("users", JSON.stringify(users));

// Load current user from localStorage
const loadCurrentUser = () =>
  JSON.parse(localStorage.getItem("currentUser")) || null;

// Save current user to localStorage
const saveCurrentUser = (user) =>
  localStorage.setItem("currentUser", JSON.stringify(user));

// Remove current user from localStorage
const removeCurrentUser = () => localStorage.removeItem("currentUser");

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    const users = loadUsers();
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return rejectWithValue("User already exists");
    }
    const newUser = { id: nanoid(), name, email, password };
    users.push(newUser);
    saveUsers(users);
    return newUser;
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    const users = loadUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      return rejectWithValue("Invalid email or password");
    }
    saveCurrentUser(user);
    return user;
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  removeCurrentUser();
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: loadUsers(),
    currentUser: loadCurrentUser(),
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export default authSlice.reducer;
