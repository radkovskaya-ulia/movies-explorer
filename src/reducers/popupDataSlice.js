import { createSlice } from "@reduxjs/toolkit";

const popUpDataSlice = createSlice({
  name: "popUpData",
  initialState: {
    isNagitionOpen: false,
    isInfoTooltipOpen: false,
  },
  reducers: {
    setIsNagitionOpen(state, action) {
      state.isNagitionOpen = action.payload;
    },
    setIsInfoTooltipOpen(state, action) {
      state.isInfoTooltipOpen = action.payload;
    },
  },
});

export const { setIsNagitionOpen, setIsInfoTooltipOpen } =
  popUpDataSlice.actions;
export default popUpDataSlice.reducer;
