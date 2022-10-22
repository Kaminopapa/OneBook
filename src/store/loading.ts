import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface loadingState {
  loadChapter: boolean;
  loadContent: boolean;
  loadBook: boolean;
}
interface initial {
  loading: loadingState;
}
//! 3 states [loading,success,failed]
const initialState: initial = {
  loading: { loadChapter: false, loadBook: false, loadContent: false },
};
const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    isLoadingBook(state, action: PayloadAction<boolean>) {
      state.loading.loadBook = action.payload;
    },
    isLoadingChapter(state, action: PayloadAction<boolean>) {
      state.loading.loadChapter = action.payload;
    },
    isLoadingContent(state, action: PayloadAction<boolean>) {
      state.loading.loadContent = action.payload;
    },
  },
});

export const {
  isLoadingBook,
  isLoadingChapter,
  isLoadingContent,
} = loadingSlice.actions;
export default loadingSlice.reducer;
