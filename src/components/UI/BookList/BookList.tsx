import React, { useContext, useEffect, useState } from "react";
import IBook, { Ibooks, IChapters } from "../../../interfaces/IBook";
import { BookCtx } from "../../../store/BookProvider";
import BookApi from "../../../services/BookApi";
import Loading from "../Loading/FetchingData";
import NoBooks from "../NoBooks/NoBooks";
import GridWrapper from "../GridBooks/GridBooks";
import EachBook from "../EachBook/EachBook";
import HorizontalScroll from "react-scroll-horizontal";
import HoriWrapper from "../HorizontalWrapper/HorizontalWrapper";
import BooksChapters from "../../chapters/BooksChapters";
import Modal from "../ChapterWrapper/ChapterWrapper";
import Content from "../../chapters/chapter-contents/Contents";
import classes from "./styles/BookList.module.css";
interface bookListProp {
  data: Ibooks;
  where?: String;
}

const BookList = (props: bookListProp) => {
  const dataList: IBook[] = props.data.data;

  const status = props.data.isLoading;
  const ctx = useContext(BookCtx);
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
  const [show, setShow] = useState(false);
  const [content, setContent] = useState(false);
  const closeContent = () => setContent(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [err, setErr] = useState(null);
  const mediaMatch = window.matchMedia("(max-width:1367px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    async function fetchChapterData() {
      setChapters((state) => ({ ...state, isLoading: true }));
      const api = await BookApi.getChapters(ctx.id);
      //! 有时候会返沪null
      if (api) {
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
    }
    fetchChapterData().catch((err) => {
      setChapters((state) => ({ ...state, isLoading: true }));
      setErr(err.message);
    });
  }, [ctx.id]);
  useEffect(() => {
    const handler = (e: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  }, []);

  const EachBookList = (
    card: string = `${classes.Card}`,
    cover: string = `${classes.imageContainer}`,
    detail: string = `${classes.detail}`
  ) => {
    return (
      <>
        {" "}
        {dataList.map((item) => (
          <EachBook
            key={item.fictionId}
            item={item}
            card={card}
            imageContainer={cover}
            detail={detail}
            handleShow={handleShow}
          />
        ))}
      </>
    );
  };
  const ResultRender = () => {
    if (props.where === "searchResult") {
      return (
        <GridWrapper>
          {EachBookList(
            `${classes.result__card}`,
            `${classes.result__cover}`,
            `${classes.result__detail}`
          )}
        </GridWrapper>
      );
    } else {
      return (
        <HoriWrapper>
          {/* 如果宽度小于1367px 不会有横向scroll */}
          <HorizontalScroll
            reverseScroll={true}
            style={{ height: "40vh" }}
            className={matches ? `${classes.bye}` : `${classes.section__one}`}
          >
            {EachBookList()}
          </HorizontalScroll>
          <div className={matches ? `${classes.yaya}` : `${classes.bye}`}>
            {EachBookList()}
          </div>
        </HoriWrapper>
      );
    }
  };

  return (
    <>
      {status && <Loading styleClass={"Load__Recomended "} show={true} />}
      {!dataList && (
        <NoBooks
          text={
            err === null ? "Oops, Something wen wrong, Refresh your page" : err
          }
        />
      )}
      {!status && dataList && <ResultRender />}
      {show && !content && (
        <Modal show={show} onClose={handleClose}>
          {chapters.isLoading && (
            <Loading
              show={chapters.isLoading}
              styleClass={"load__container chapter__wrapper"}
            />
          )}
          {!chapters.isLoading && chapters && (
            <BooksChapters
              chapter={chapters}
              onHandleClose={handleClose}
              setShow={setContent}
            />
          )}
          {!chapters && <p>refresh</p>}
        </Modal>
      )}
      {content && (
        <Modal show={content} onClose={closeContent}>
          <Content onClose={closeContent} />
        </Modal>
      )}
    </>
  );
};

export default BookList;
