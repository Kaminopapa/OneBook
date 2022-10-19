import React, { useEffect, useState, useContext } from "react";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import "./App.css";

import BookApi from "./services/BookApi";
import { Ibooks } from "./interfaces/IBook";

import { BookCtx } from "./store/BookProvider";
import BookList from "./components/UI/BookList/BookList";
import Header from "./components/UI/Header/Header";
function App() {
  //input from Search.tsx
  const ctx = useContext(BookCtx);
  const [bookData, setbookData] = useState<Ibooks>({
    isLoading: false,
    msg: "",
    code: 0,
    count: 0,
    data: [],
  });
  const [search, setSearch] = useState<Ibooks>({
    isLoading: false,
    msg: "",
    code: 0,
    count: 0,
    data: [],
  });
  useEffect(() => {
    async function fetchData() {
      setbookData((state) => ({
        ...state,
        isLoading: true,
        msg: "Fetching data",
      }));
      const api = await BookApi.getFictions();
      if (api) {
        setbookData({
          isLoading: false,
          msg: api.msg,
          code: api.count,
          data: api.data,
          count: api.count,
        });
      }
    }
    fetchData();
    return;
  }, [setbookData]);
  useEffect(() => {
    async function fetchSearchResult() {
      setSearch((state) => ({ ...state, isLoading: true }));
      const api = await BookApi.searchFictions(ctx.name);
      if (api) {
        setSearch({
          isLoading: false,
          msg: api.msg,
          code: api.count,
          data: api.data,
          count: api.count,
        });
      }
    }
    fetchSearchResult();
  }, [ctx.name]);

  return (
    <>
      <Header />
      <Home />
      <BookList data={bookData} />

      <Search />
      <BookList data={search} where={"searchResult"} />
    </>
  );
}

export default App;
