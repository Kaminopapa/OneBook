import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import "./App.css";
import Recomended from "./components/Recomended";
import BookApi from "./services/BookApi";
import IBook, { Ibooks, IChapters } from "./interfaces/IBook";
import BooksResult from "./components/BooksResult";

function App() {
  const [RecomendedFictions, setRecomendedFictions] = useState<IBook[]>([]);
  const [chapter, setChapter] = useState<IChapters>();
  //input from Search.tsx
  const [userInput, setUserInput] = useState("");
  const [bookData, setbookData] = useState<Ibooks>({
    isLoading: false,
    msg: "",
    code: 0,
    count: 0,
    data: [],
  });

  const handleInput = (input: string) => {
    setUserInput(input);
  };

  useEffect(() => {
    async function fetchData() {
      setbookData({
        isLoading: true,
        msg: "Fetching data",
        code: 0,
        count: 0,
        data: [],
      });
      const api = await BookApi.getFictions();
      setbookData({
        isLoading: false,
        msg: api.msg,
        code: api.count,
        data: api.data,
        count: api.count,
      });
      setRecomendedFictions(api.data);
    }
    fetchData();
  }, [setbookData]);

  const getChapter = (a: IChapters) => {
    setChapter(a);
  };

  return (
    <div id="/">
      <Home />
      <Recomended items={RecomendedFictions} dataStatus={bookData} />
      <Search onHandleInput={handleInput} />

      <BooksResult userInput={userInput} />
    </div>
  );
}

export default App;
