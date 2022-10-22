import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { IChapters } from "../interfaces/IBook";
interface BookState {
  id: string;
  title: string;
  name: string;
  cover: string;
  added: boolean;
}
interface initial {
  items: BookState[];
  count: number;
}
const initialState: initial = {
  items: [],
  count: 0,
};
const collectionSlice = createSlice({
  name: "collection",
  initialState: initialState,
  reducers: {
    add(state, action: PayloadAction<BookState>) {
      const newItem = action.payload;
      let exist = state.items.find((item) => item.id === newItem.id);
      if (!exist) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          name: newItem.name,
          cover: newItem.cover,
          added: newItem.added,
        });
        state.count++;
      }
    },
    remove(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.count--;
    },
    getCollections(state, action: PayloadAction<BookState>) {
      const newItem = action.payload;
      state.items.push({
        id: newItem.id,
        title: newItem.title,
        name: newItem.name,
        cover: newItem.cover,
        added: newItem.added,
      });
      state.count = state.items.length || 0;
    },
  },
});
export const { add, remove, getCollections } = collectionSlice.actions;
export default collectionSlice.reducer;
