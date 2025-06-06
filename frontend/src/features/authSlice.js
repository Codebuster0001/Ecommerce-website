// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunks
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const existingUser = auth.users.find((user) => user.email === email);
    if (existingUser) {
      return rejectWithValue('User already exists');
    }

    const newUser = { name, email, password };
    const updatedUsers = [...auth.users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    return newUser;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const user = auth.users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return rejectWithValue('Invalid email or password');
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  localStorage.removeItem('currentUser');
  return null;
});

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || [],
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
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
 