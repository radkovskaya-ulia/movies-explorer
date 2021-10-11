import { createSlice } from "@reduxjs/toolkit";

const searchDataSlice = createSlice({
  name: "searchData",
  initialState: {
    checked: "",
    phrase: "",
    seachInputError: false,
  },
  reducers: {
    setChecked(state, action) {
      state.checked = action.payload;
    },
    setPhrase(state, action) {
      state.phrase = action.payload;
    },
    setSeachInputError(state, action) {
      state.seachInputError = action.payload;
    },
  },
});

export const { setChecked, setPhrase, setSeachInputError } =
  searchDataSlice.actions;
export default searchDataSlice.reducer;
