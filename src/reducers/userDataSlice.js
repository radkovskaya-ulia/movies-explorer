import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    currentUser: {},
    loggedIn: false,
    errorAuthMessage: false,
    infoEditProfileMessage: false,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
    setErrorAuthMessage(state, action) {
      state.errorAuthMessage = action.payload;
    },
    setInfoProfileMessage(state, action) {
      state.infoEditProfileMessage = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  setLoggedIn,
  setErrorAuthMessage,
  setInfoProfileMessage,
} = userDataSlice.actions;
export default userDataSlice.reducer;
