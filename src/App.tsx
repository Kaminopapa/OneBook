import React, { useEffect, useState, useContext } from "react";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import "./App.css";
import Recomended from "./components/recomended/Recomended";
import BookApi from "./services/BookApi";
import { Ibooks } from "./interfaces/IBook";
import BooksResult from "./components/bookResult/BooksResult";
import { BookCtx } from "./store/BookProvider";
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
      setbookData({
        isLoading: false,
        msg: api.msg,
        code: api.count,
        data: api.data,
        count: api.count,
      });
    }
    fetchData();
    return;
  }, [setbookData]);
  useEffect(() => {
    async function fetchSearchResult() {
      setSearch((state) => ({ ...state, isLoading: true }));
      const api = await BookApi.searchFictions(ctx.name);
      setSearch({
        isLoading: false,
        msg: api.msg,
        code: api.count,
        data: api.data,
        count: api.count,
      });
    }
    fetchSearchResult();
  }, [ctx.name]);
  return (
    <>
      <Home />
      <Recomended dataStatus={bookData} />
      <Search />
      <BooksResult data={search} />
    </>
  );
}

export default App;
