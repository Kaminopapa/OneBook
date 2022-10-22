import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface inital {
  isShow: boolean;
  isContent: boolean;
}
const initialState: inital = {
  isShow: false,
  isContent: false,
};

const toggleSlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<boolean>) {
      state.isShow = action.payload;
    },
    toggleContent(state, action: PayloadAction<boolean>) {
      state.isContent = action.payload;
    },
  },
});
export const { toggle, toggleContent } = toggleSlice.actions;
export default toggleSlice.reducer;
