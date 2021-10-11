import { configureStore, combineReducers } from "@reduxjs/toolkit";

import moviesDataSlice from "./moviesDataSlice";
import popupDataSlice from "./popupDataSlice";
import searchDataSlice from "./searchDataSlice";
import userDataSlice from "./userDataSlice";

const rootReducer = combineReducers({
  userData: userDataSlice,
  moviesData: moviesDataSlice,
  popupData: popupDataSlice,
  searchData: searchDataSlice,
});

export const store = configureStore ({
  reducer: rootReducer
})
