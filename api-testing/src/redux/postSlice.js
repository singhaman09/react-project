// src/redux/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import freesoundApi from '../api/axiosConfig';

//   Async thunks
export const fetchSounds = createAsyncThunk(
  'sounds/fetchSounds',
  async (searchTerm = "lofi") => {
    const res = await freesoundApi.get(`/search/text/?query=${searchTerm}`);
    return res.data.results;
  }
);

export const addSound = createAsyncThunk('sounds/add', async (newSound) => {
  return newSound;
});

export const updateSound = createAsyncThunk('sounds/update', async (updatedSound) => {
  return updatedSound;
});

export const deleteSound = createAsyncThunk('sounds/delete', async (soundId) => {
  return soundId;
});

//   Slice
const soundSlice = createSlice({
  name: 'sounds',
  initialState: {
    sounds: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSounds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSounds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sounds = action.payload;
      })
      .addCase(fetchSounds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addSound.fulfilled, (state, action) => {
        state.sounds.push(action.payload);
      })
      .addCase(updateSound.fulfilled, (state, action) => {
        const index = state.sounds.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.sounds[index] = action.payload;
      })
      .addCase(deleteSound.fulfilled, (state, action) => {
        state.sounds = state.sounds.filter((s) => s.id !== action.payload);
      });
  },
});

//   Default export only the reducer
export default soundSlice.reducer;
