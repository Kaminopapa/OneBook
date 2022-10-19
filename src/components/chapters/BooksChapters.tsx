import React, { useContext, useState } from "react";
import { IChapterList, IChapters } from "../../interfaces/IBook";
import { MdClose } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import "./styles/BooksChapter2.css";
import { BookCtx } from "../../store/BookProvider";
import { add } from "../../store/collection";
import { useAddDispatch } from "../../store";

interface BooksChaptersProps {
  chapter: IChapters;
  onHandleClose: () => void;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const BooksChapters = (props: BooksChaptersProps) => {
  //TODO: chapter should be in reverse order
  const chapterList: IChapterList[] = props.chapter.chapterList;
  const chapter = props.chapter;

  const dispatch = useAddDispatch();
  const ctx = useContext(BookCtx);

  const clickForContent = (id: string) => {
    ctx.onSetContentId(id);
    props.setShow(true);
  };
  const handleCollect = () => {
    dispatch(
      add({
        id: chapter.fictionId,
        title: chapter.title,
        name: chapter.author,
        cover: chapter.cover,
        added: true,
      })
    );
  };
  return (
    <>
      <div className="fiction__chapter__header">
        <div className="fiction__chapter__cover">
          <img src={chapter.cover} alt={`${chapter.cover} cover} `} />
        </div>
        <div className="fiction__chapter__body">
          <h3>《{chapter.title}》</h3>
          <h4>{chapter.author}</h4>
          <p> {chapter.descs} </p>
        </div>
      </div>

      <ul>
        {chapterList.map((a) => (
          <li key={a.chapterId} onClick={() => clickForContent(a.chapterId)}>
            {a.title}
          </li>
        ))}
      </ul>
      <div className="controls">
        <button onClick={() => props.onHandleClose()}>
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
