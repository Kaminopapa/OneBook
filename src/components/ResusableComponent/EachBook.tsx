import React, { useEffect, useState } from "react";
import IBook, { IChapters } from "../../interfaces/IBook";

interface EachBookProps {
  item: IBook;
  card: string;
  detail: string;
  imageContainer: string;
  getId: React.Dispatch<React.SetStateAction<string>>;
  handleShow: () => void;
}

const EachBook = (props: EachBookProps) => {
  const [chapterId, setChapterId] = useState("");
  const item = props.item;

  function resizeDescription(name: string): string {
    if (name) {
      let arr: string[] =
        name.split("！").length < 3 ? name.split("。") : name.split("！");

      let newString: string = "";
      let count = 0;
      while (count <= 1) {
        if (arr[count]) {
          newString += arr[count] + "。";
          count++;
        }
        count++;
      }

      return newString;
    }

    return name;
  }

  const clickForChapter = () => {
    console.log(chapterId);
    if (chapterId === "") {
      setChapterId("");
    }
    setChapterId(item.fictionId);
    props.getId(chapterId);
    props.handleShow();
  };

  return (
    <div className={props.card} key={item.fictionId} onClick={clickForChapter}>
      <div className={props.imageContainer}>
        <img src={item.cover} alt={`${item.title} cover`} />
      </div>
      <div className={props.detail}>
        <h3>{item.title}</h3>
        <p> {resizeDescription(item.descs)} </p>
        <h4>{item.author}</h4>
      </div>
    </div>
  );
};

export default EachBook;
