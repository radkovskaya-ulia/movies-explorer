import { createSlice } from "@reduxjs/toolkit";

const moviesDataSlice = createSlice({
  name: "moviesData",
  initialState: {
    cards: [],
    savedCards: [],
    savedFilteredCards: [],
    width: 0,
    numCards: 0,
    loading: false,
    infoMoviesMessage: false,
    infoSavedMoviesMessage: false,
    errorMoviesMessage: false,
  },
  reducers: {
    setCards(state, action) {
      state.cards = action.payload;
    },
    setSavedCards(state, action) {
      state.savedCards = action.payload;
    },
    setSavedFilteredCards(state, action) {
      state.savedFilteredCards = action.payload;
    },
    setWidth(state, action) {
      state.width = action.payload;
    },
    setNumCards(state, action) {
      state.numCards = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setInfoMoviesMessage(state, action) {
      state.infoMoviesMessage = action.payload;
    },
    setInfoSavedMoviesMessage(state, action) {
      state.infoSavedMoviesMessage = action.payload;
    },
    setErrorMoviesMessage(state, action) {
      state.errorMoviesMessage = action.payload;
    },
  },
});

export const {
  setCards,
  setSavedCards,
  setSavedFilteredCards,
  setWidth,
  setNumCards,
  setLoading,
  setInfoMoviesMessage,
  setInfoSavedMoviesMessage,
  setErrorMoviesMessage,
  setSeachInputError,
} = moviesDataSlice.actions;
export default moviesDataSlice.reducer;
