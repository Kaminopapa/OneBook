import { IChapters, IContent } from "../interfaces/IBook";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initial {
  id: string;
  contentId: string;
  chapters: IChapters;
  contents: IContent;
}
const initialState: initial = {
  contentId: "",
  id: "",
  chapters: {
    fictionId: "",
    fictionType: "",
    cover: "",
    title: "",
    chapterList: [],
    author: "",
    descs: "",
    updateTime: "",
    isLoading: false,
  },
  contents: { msg: "", code: 0, count: 0, data: [] },
};

const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    getId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
    getChapter(state, action: PayloadAction<IChapters>) {
      state.chapters = action.payload;
    },
    getContentId(state, action: PayloadAction<string>) {
      state.contentId = action.payload;
    },
    getContents(state, action: PayloadAction<IContent>) {
      state.contents = action.payload;
    },
  },
});
export const {
  getChapter,
  getId,
  getContentId,
  getContents,
} = chapterSlice.actions;
export default chapterSlice.reducer;
