import React, { useEffect, useState, useContext } from "react";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import "./App.css";
import Recomended from "./components/recomended/Recomended";
import BookApi from "./services/BookApi";
import { Ibooks } from "./interfaces/IBook";
import BooksResult from "./components/bookResult/BooksResult";
import { BookCtx } from "./store/BookProvider";
import BookList from "./components/UI/BookList/BookList";
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
  //! BookList
  //Todo: 样式有点问题，还有点击书的时候加载动画没有显示出来也有问题
  //Todo: 搜索结果，还没进行搜索就出现了加载的动画。加载
  return (
    <>
      <Home />
      <BookList data={bookData} />
      {/* <Recomended dataStatus={bookData} /> */}
      <Search />
      <BookList data={search} where={"searchResult"} />
      {/* <BooksResult data={search} /> */}
    </>
  );
}

export default App;
