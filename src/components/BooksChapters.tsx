import React from "react";
import { IChapters } from "../interfaces/IBook";

import "./styles/BooksChapters.css";
interface BooksChaptersProps {
  chapter: IChapters;
  onHandleClose: () => void;
}
const BooksChapters = (props: BooksChaptersProps) => {
  const chapterList = props.chapter.chapterList;
  const chapter = props.chapter;
  return (
    <div className="fiction__chapter">
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
          <li key={a.chapterId}>{a.title}</li>
        ))}
      </ul>
      <button onClick={() => props.onHandleClose()}>X</button>
    </div>
  );
};

export default BooksChapters;
