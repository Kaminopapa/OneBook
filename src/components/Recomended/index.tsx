import React, { useEffect, useState } from "react";

import { RootState, useAppSelector, useAddDispatch } from "../../store";
import BooksChapters from "../chapters";
import Modal from "../UI/ChapterWrapper";
import EachBook from "../UI/EachBook";
import HorizontalWrapper from "../UI/HorizontalWrapper/HorizontalWrapper";
import classes from "./styles/styles.module.css";
import Loading from "../UI/Loading/FetchingData";
import { fetchBooksData } from "../../store/books-actions";
import Content from "../chapters/chapter-contents/index";
import NoBooks from "../UI/NoBooks/NoBooks";
const Populate = () => {
  const dispatch = useAddDispatch();
  const books = (s: RootState) => s.books.books;
  const loading = (s: RootState) => s.loading.loading;
  const display = (s: RootState) => s.display;
  const chapter = (s: RootState) => s.chapter.chapters;
  const chaptersId = (s: RootState) => s.chapter.id;
  const id = useAppSelector(chaptersId);
  const chapterState = useAppSelector(chapter);
  const bookState = useAppSelector(books);
  const loadingState = useAppSelector(loading);
  const toggle = useAppSelector(display);
  const mediaMatch = window.matchMedia("(max-width:1367px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  // DO Not using some functions have already deprecated
  // useEffect(() => {
  //   const handler = (e: {
  //     matches: boolean | ((prevState: boolean) => boolean);
  //   }) => setMatches(e.matches);
  //   mediaMatch.addListener(handler);
  //   return () => mediaMatch.removeListener(handler);
  // }, []);

  useEffect(() => {
    dispatch(fetchBooksData());
  }, []);

  // Instead of using useEffect, directly call fetchChapterData when user clicks on book
  // useEffect(() => {
  //   if (id === "") return;
  //   dispatch(fetchChapterData(id));
  // }, [id]);

  const resultRender = (
    <HorizontalWrapper>
      <div className={matches ? classes.yaya : classes.scrollArea}>
        {bookState &&
          bookState.map((item) => (
            <EachBook
              key={item.fictionId}
              item={item}
              card={classes.Card}
              imageContainer={classes.imageContainer}
              detail={classes.detail}
            />
          ))}
      </div>
    </HorizontalWrapper>
  );
  return (
    <>
      {loadingState.loadBook && (
        <Loading show={true} styleClass={"Load__Recomended"} />
      )}
      {!loadingState.loadBook && !bookState && (
        <NoBooks text={"Sorry, Book data fetching failed"} />
      )}
      {!loadingState.loadBook && bookState && resultRender}
      {toggle.isShow && !toggle.isContent && (
        <Modal show={toggle.isShow}>
          {loadingState.loadChapter && (
            <Loading
              show={true}
              styleClass={"load__container chapter__wrapper"}
            />
          )}
          {!loadingState.loadChapter && chapterState && <BooksChapters />}
          {!chapterState && (
            <NoBooks text={"Sorry,couldn't load this chapter"} />
          )}
        </Modal>
      )}
      {toggle.isContent && (
        <Modal show={toggle.isContent}>
          <Content />
        </Modal>
      )}
    </>
  );
};

export default Populate;
