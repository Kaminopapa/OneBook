import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { IChapters } from "../interfaces/IBook";
import IBook from "../interfaces/IBook";

interface initial {
  items: IBook[];
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
    add(state, action: PayloadAction<IBook>) {
      const newItem = action.payload;
      let exist = state.items.find(
        (item) => item.fictionId === newItem.fictionId
      );
      if (!exist) {
        state.items.push({
          fictionId: newItem.fictionId,
          title: newItem.title,
          author: newItem.author,
          cover: newItem.cover,
          descs: newItem.descs,
          fictionType: newItem.fictionType,
          updateTime: newItem.updateTime,
          idLoading: newItem.idLoading,
        });
        state.count++;
      }
    },
    remove(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.fictionId !== id);
      state.count--;
    },
    getCollections(state, action: PayloadAction<IBook>) {
      const newItem = action.payload;
      state.items.push({
        fictionId: newItem.fictionId,
        title: newItem.title,
        author: newItem.author,
        cover: newItem.cover,
        descs: newItem.descs,
        fictionType: newItem.fictionType,
        updateTime: newItem.updateTime,
        idLoading: newItem.idLoading,
      });
      state.count = state.items.length || 0;
    },
  },
});
export const { add, remove, getCollections } = collectionSlice.actions;
export default collectionSlice.reducer;
