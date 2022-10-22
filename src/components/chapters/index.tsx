import React, { useState } from "react";

import { MdClose } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import "./styles/BooksChapter2.css";

import { add } from "../../store/collection";
import { useAddDispatch, useAppSelector, RootState } from "../../store";
import { toggleContent, toggle } from "../../store/display";
import { getContentId } from "../../store/chapters";

const BooksChapters = () => {
  //TODO: chapter should be in reverse order
  const [isCollected, setIsCollected] = useState(false);
  const chapters = (s: RootState) => s.chapter.chapters;
  const chapterState = useAppSelector(chapters);
  const dispatch = useAddDispatch();
  const clickForContent = (id: string) => {
    dispatch(getContentId(id));
    dispatch(toggleContent(true));
  };
  const handleClose = () => {
    dispatch(toggle(false));
  };
  const handleCollect = () => {
    dispatch(
      add({
        fictionId: chapterState.fictionId,
        title: chapterState.title,
        author: chapterState.author,
        cover: chapterState.cover,
        descs: chapterState.descs,
        fictionType: chapterState.fictionType,
        updateTime: chapterState.updateTime,
        idLoading: chapterState.isLoading,
      })
    );
  };
  return (
    <>
      <div className="fiction__chapter__header">
        <div className="fiction__chapter__cover">
          <img src={chapterState.cover} alt={`${chapterState.cover} cover} `} />
        </div>
        <div className="fiction__chapter__body">
          <h3>《{chapterState.title}》</h3>
          <h4>{chapterState.author}</h4>
          <p> {chapterState.descs} </p>
        </div>
      </div>

      <ul>
        {chapterState.chapterList.map((a) => (
          <li key={a.chapterId} onClick={() => clickForContent(a.chapterId)}>
            {a.title}
          </li>
        ))}
      </ul>
      <div className="controls">
        <button onClick={handleClose}>
          <MdClose className="close" />
        </button>
        <button onClick={handleCollect}>
          <AiOutlineStar className="collect" />
        </button>
      </div>
    </>
  );
};

export default BooksChapters;
