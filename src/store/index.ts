import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import CollectionReducer from "./collection";
import BooksReducer from "./books";
import LoadingReducer from "./loading";
import DisplayReducer from "./display";
import ChapterResucer from "./chapters";
const store = configureStore({
  reducer: {
    collection: CollectionReducer,
    books: BooksReducer,
    loading: LoadingReducer,
    display: DisplayReducer,
    chapter: ChapterResucer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAddDispatch = () => useDispatch<AppDispatch>();
export default store;
