import React, { useEffect, useState } from "react";
import IBook, { Ibooks, IChapters } from "../interfaces/IBook";
import BookApi from "../services/BookApi";
import BooksChapters from "./BooksChapters";
import EachBook from "./ResusableComponent/EachBook";
import FetchingData from "./ResusableComponent/FetchingData";
import "./styles/BooksResult.css";

interface BooksResultProps {
  userInput: string;
}
const BooksResult = (props: BooksResultProps) => {
  const [searchResult, setSearchResult] = useState<Ibooks>({
    isLoading: false,
    msg: "",
    code: 0,
    count: 0,
    data: [],
  });
  const [chapters, setChapters] = useState<IChapters>({
    fictionId: "",
    title: "",
    descs: "",
    cover: "",
    author: "",
    fictionType: "",
    updateTime: "",
    isLoading: false,
    chapterList: [],
  });
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  useEffect(() => {
    async function fetchChapterData() {
      setChapters({
        fictionId: "",
        title: "",
        descs: "",
        cover: "",
        author: "",
        fictionType: "",
        updateTime: "",
        isLoading: false,
        chapterList: [],
      });
      const api = await BookApi.getChapters(id);
      setChapters({
        fictionId: api.fictionId,
        title: api.title,
        descs: api.descs,
        cover: api.cover,
        author: api.author,
        fictionType: api.fictionType,
        updateTime: api.updateTime,
        isLoading: false,
        chapterList: api.chapterList,
      });
    }
    fetchChapterData();
  }, [id]);
  const [a, seta] = useState<IBook[]>([]);

  useEffect(() => {
    async function fetchSearchResult() {
      setSearchResult({
        isLoading: true,
        msg: "",
        code: 0,
        count: 0,
        data: [],
      });
      const api = await BookApi.searchFictions(props.userInput);
      setSearchResult({
        isLoading: false,
        msg: api.msg,
        code: api.count,
        data: api.data,
        count: api.count,
      });
      seta(searchResult.data);
    }
    fetchSearchResult();
  }, [props.userInput]);

  const ResultRender = () => {
    if (searchResult.isLoading) {
      return <FetchingData styleClass={"Load__Recomended"} show={true} />;
    }
    if (!a || a.length === 0) {
      return (
        <p
          style={{
            color: "#FF425E;",

            textAlign: "center",
          }}
        >
          No books,Sorry Refresh Your page
        </p>
      );
    }
    return (
      <>
        <div className="section section__two">
          <div className="card__list">
            {a.map((item) => (
              <EachBook
                key={item.fictionId}
                item={item}
                card={"result__card"}
                imageContainer={"result__cover"}
                detail={"result__detail"}
                getId={setId}
                handleShow={handleShow}
              />
            ))}
          </div>
        </div>
        <div className={show ? "chapter__wrapper" : "no__wrapper"}>
          {chapters.isLoading ? (
            <FetchingData
              show={chapters.isLoading}
              styleClass={"load__container chapter__wrapper"}
            />
          ) : (
            chapters && (
              <BooksChapters chapter={chapters} onHandleClose={handleClose} />
            )
          )}
        </div>
      </>
    );
  };
  return <ResultRender />;
};

export default BooksResult;
