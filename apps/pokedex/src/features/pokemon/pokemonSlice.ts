import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPokemonList, fetchPokemonDetails } from '@monorepo/utils';
import { HYDRATE } from 'next-redux-wrapper';
import type { RootState } from '../../store';
import type { Pokemon, PokemonListResult } from '../../types/Pokemon';

interface PokemonState {
  list: PokemonListResult[];
  selected: Pokemon | null;
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

export const getPokemonList = createAsyncThunk(
  'pokemon/list',
  async (page: number, { rejectWithValue }) => {
    try {
      return await fetchPokemonList(page);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getPokemonDetails = createAsyncThunk(
  'pokemon/details',
  async (id: string, { rejectWithValue }) => {
    try {
      return await fetchPokemonDetails(id);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: any) => {
        const serverState = action.payload.pokemon as PokemonState;
        return {
          ...state,
          ...serverState,
          list: [...state.list, ...serverState.list]
        };
      })
      .addCase(getPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results;
      })
      .addCase(getPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getPokemonDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPokemonDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(getPokemonDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectPokemon = (state: RootState) => state.pokemon;
export default pokemonSlice.reducer;