import React, { useContext, useEffect, useState, memo } from "react";
import IBook, { Ibooks, IChapters } from "../../interfaces/IBook";
import "./styles/Recomended.css";
import RecomendedList from "./RecomendedList";
import FetchingData from "../UI/Loading/FetchingData";
import BooksChapters from "../chapters/BooksChapters";
import BookApi from "../../services/BookApi";
import { BookCtx } from "../../store/BookProvider";
import NoBooks from "../UI/NoBooks/NoBooks";
import Modal from "../UI/ChapterWrapper/ChapterWrapper";
import Content from "../chapters/chapter-contents/Contents";
interface BookListProps {
  dataStatus: Ibooks;
}

function Recomended(props: BookListProps) {
  //tablet devices
  const data: IBook[] = props.dataStatus.data;

  const ctx = useContext(BookCtx);
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

  const [show, setShow] = useState(false);
  const [content, setContent] = useState(false);
  const closeContent = () => setContent(false);
  const handleClose = () => setShow(false);
  useEffect(() => {
    const handler = (e: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  });

  useEffect(() => {
    async function fetchChapterData() {
      setChapters((state) => ({ ...state, isLoading: true }));
      const api = await BookApi.getChapters(ctx.id);
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
  }, [ctx.id]);

  return (
    <>
      {/* When data isLoading */}
      {props.dataStatus.isLoading && (
        <FetchingData styleClass={"Load__Recomended "} show={true} />
      )}

      {/* when data cannot Load */}
      {!data && <NoBooks text="Oops, Something wen wrong, Refresh your page" />}

      {/* when data is not loading and data is not null */}
      {!props.dataStatus.isLoading && data && (
        <RecomendedList data={data} matches={matches} setShow={setShow} />
      )}
      {show && !content && (
        <Modal show={show} onClose={handleClose}>
          {chapters.isLoading && (
            <FetchingData
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
}

export default memo(Recomended);
