import React, { useEffect } from "react";
import Home from "./components/home/Home";
import "./App.css";
import Header from "./components/UI/Header/Header";
import {
  fetchBooksData,
  fetchSearchResult,
  getLocalCollection,
} from "./store/books-actions";
import { useAddDispatch, RootState, useAppSelector } from "./store/";
import Search from "./components/search/Search";
import Populate from "./components/Recomended";
import SearchResult from "./components/SearchResult";

function App() {
  const name = (s: RootState) => s.books.name;
  const searchName = useAppSelector(name);
  const dispatch = useAddDispatch();
  const bookname = (s: RootState) => s.books.name;
  const nameState = useAppSelector(bookname);
  const collections = (s: RootState) => s.collection;
  const collectionsState = useAppSelector(collections);

  //getBooksData
  useEffect(() => {
    dispatch(fetchBooksData());
    dispatch(getLocalCollection());
  }, []);

  useEffect(() => {
    if (nameState !== "") {
      dispatch(fetchSearchResult(nameState));
    }
  }, [searchName]);

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collectionsState.items));
  });
  console.log(nameState);
  //Todo:
  //::search result 加载动画位置不对

  //Todo:未来要实现的功能
  //::记录最后一次阅读的地方
  //::点击空白处移除收藏功能

  return (
    <>
      <Header />
      <Home />
      <Populate />

      <Search />
      <SearchResult />
    </>
  );
}

export default App;
