import React, { useEffect, useState } from "react";

import IBook, { Ibooks, IChapters } from "../interfaces/IBook";
import "./styles/Recomended.css";
import HorizontalScroll from "react-scroll-horizontal";
import EachBook from "./ResusableComponent/EachBook";
import FetchingData from "./ResusableComponent/FetchingData";
import BooksChapters from "./BooksChapters";
import BookApi from "../services/BookApi";

interface BookListProps {
  items: IBook[];
  dataStatus: Ibooks;
}

function Recomended(props: BookListProps) {
  //tablet devices
  const mediaMatch = window.matchMedia("(max-width:1367px)");
  const [matches, setMatches] = useState(mediaMatch.matches);
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
    const handler = (e: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });
  console.log(matches);
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

  const RecomendedList = () => {
    if (props.dataStatus.isLoading) {
      return (
        <div>
          <h1
            style={{
              backgroundColor: "black",
              color: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Fetching data...
          </h1>
          <FetchingData styleClass={"Load__Recomended "} show={true} />
        </div>
      );
    }

    if (!props.items || props.items.length === 0)
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
    return (
      <div className="hello">
        <div className="introduction">
          <h2>滚动鼠标查看更多</h2>
          <p>Or</p>
          <button>
            <a href="#search">搜索</a>
          </button>
          <h2>你感兴趣的</h2>
        </div>
        <HorizontalScroll
          reverseScroll={true}
          style={{ height: "40vh" }}
          className={matches ? "bye" : "section__one"}
        >
          {props.items.map((item) => (
            <EachBook
              key={item.fictionId}
              item={item}
              card={"Card"}
              imageContainer={"imageContainer"}
              detail={"detail"}
              handleShow={handleShow}
              getId={setId}
            />
          ))}
        </HorizontalScroll>
        <div className={matches ? "yaya" : "bye"}>
          {props.items.map((item) => (
            <EachBook
              key={item.fictionId}
              item={item}
              card={"Card"}
              imageContainer={"imageContainer"}
              detail={"detail"}
              handleShow={handleShow}
              getId={setId}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <RecomendedList />

      {chapters.isLoading ? (
        <div className={show ? "chapter__wrapper" : "no__wrapper"}>
          <FetchingData
            show={chapters.isLoading}
            styleClass={"load__container chapter__wrapper"}
          />
        </div>
      ) : (
        <div className={show ? "chapter__wrapper" : "no__wrapper"}>
          {chapters && (
            <BooksChapters chapter={chapters} onHandleClose={handleClose} />
          )}
        </div>
      )}
    </>
  );
}

export default Recomended;
