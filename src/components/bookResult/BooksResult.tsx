import React, { useContext, useEffect, useState } from "react";
import IBook, { Ibooks, IChapters } from "../../interfaces/IBook";
import BookApi from "../../services/BookApi";
import BooksChapters from "../chapters/BooksChapters";
import EachBook from "../UI/EachBook/EachBook";
import FetchingData from "../UI/Loading/FetchingData";
import "./styles/BooksResult.css";
import { BookCtx } from "../../store/BookProvider";
import NoBooks from "../UI/NoBooks/NoBooks";
import Modal from "../UI/ChapterWrapper/ChapterWrapper";
import Content from "../chapters/chapter-contents/Contents";
import GridWrapper from "../UI/GridBooks/GridBooks";
interface resultProps {
  data: Ibooks;
}
const BooksResult = ({ data }: resultProps) => {
  const searchResult: IBook[] = data.data;
  const [err, setErr] = useState(null);
  const [content, setContent] = useState(false);
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
  const ctx = useContext(BookCtx);
  const [show, setShow] = useState(false);
  const closeContent = () => setContent(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    async function fetchChapterData() {
      setChapters((state) => ({ ...state, isLoading: true }));
      const api = await BookApi.getChapters(ctx.id);
      //! 有时候会返沪null
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
    fetchChapterData().catch((err) => {
      setChapters((state) => ({ ...state, isLoading: false }));
      setErr(err.message);
    });
  }, [ctx.id]);

  const ResultRender = () => {
    return (
      <GridWrapper>
        {searchResult.map((item) => (
          <EachBook
            key={item.fictionId}
            item={item}
            card={"result__card"}
            imageContainer={"result__cover"}
            detail={"result__detail"}
            handleShow={handleShow}
          />
        ))}
      </GridWrapper>
    );
  };
  return (
    <>
      {data.isLoading && (
        <FetchingData styleClass={"loas__Recommended"} show={true} />
      )}
      {!searchResult ||
        (searchResult.length === 0 && (
          <NoBooks
            text={
              err === null
                ? "Enter some value to see your search result here"
                : err
            }
          />
        ))}
      {!data.isLoading && searchResult && <ResultRender />}
      {show && (
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
          {content && (
            <Modal show={content} onClose={closeContent}>
              <Content onClose={closeContent} />
            </Modal>
          )}
        </Modal>
      )}
    </>
  );
};

export default BooksResult;
