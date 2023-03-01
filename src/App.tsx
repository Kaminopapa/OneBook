import React, { useEffect } from "react";
import Home from "./components/home/Home";
import "./App.css";
import Header from "./components/UI/Header/Header";
import { fetchSearchResult } from "./store/books-actions";
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

  // This has two issues:
  // 1. getBooksData should happen in Populate component
  // 2. getLocalCollection() can be init when set up default redux state

  // useEffect(() => {
  //   dispatch(fetchBooksData());
  //   dispatch(getLocalCollection());
  // }, []);

  // This has 3 issues:
  // 1. Should use useDebounce hook (https://usehooks.com/useDebounce/), if you want user typing while get results.
  //    but in your case, after user finish typing then hit enter, user can see the result.
  // 2. This useEffect should be move to where you do the search
  useEffect(() => {
    if (nameState !== "") {
      dispatch(fetchSearchResult(nameState));
    }
  }, [searchName]);

  // This will be called every time your component render.
  // shouldn't do this way, move it into collection.ts
  // useEffect(() => {
  //   localStorage.setItem("collections", JSON.stringify(collectionsState.items));
  // });

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
