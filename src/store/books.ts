import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import IBook, { Ibooks } from "../interfaces/IBook";
interface initial {
  books: IBook[];
  result: IBook[];
  name: string;
}

const initialState: initial = {
  books: [],
  result: [],
  name: "",
};

const bookSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    getBooks(state, action: PayloadAction<initial>) {
      state.books = action.payload.books;
    },
    getName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    getResult(state, action: PayloadAction<initial>) {
      state.result = action.payload.result;
    },
  },
});

export const { getBooks, getName, getResult } = bookSlice.actions;
export default bookSlice.reducer;
