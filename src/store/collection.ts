import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IBook from "../interfaces/IBook";

interface initial {
  items: IBook[];
  count: number;
}

const getLocalCollection = () => {
  const localCollections = localStorage.getItem("collections");
  const items = JSON.parse(localCollections || '[ ]');
  return items
 }

const initialState: initial = {
  items: getLocalCollection(),
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
        state.items.push(newItem);
        console.info(state.items)
        localStorage.setItem("collections", JSON.stringify(state.items));
        state.count++;
      }
    },
    remove(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.fictionId !== id);
      console.info(state.items)
      localStorage.setItem("collections", JSON.stringify(state.items));
      state.count--;
    },
    getCollections(state, action: PayloadAction<IBook>) {
      const newItem = action.payload;
      state.items.push(newItem);
      state.count = state.items.length || 0;
    },
  },
});
export const { add, remove, getCollections } = collectionSlice.actions;
export default collectionSlice.reducer;
