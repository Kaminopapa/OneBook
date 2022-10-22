import React, { useEffect, useState, useRef, useMemo } from "react";
import NoBooks from "../../UI/NoBooks/NoBooks";

import FetchingData from "../../UI/Loading/FetchingData";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { WiDaySunny } from "react-icons/wi";
import { MdModeNight, MdClose } from "react-icons/md";
import { fetchContentData } from "../../../store/books-actions";
import { RootState, useAppSelector, useAddDispatch } from "../../../store";

import "./styles/Content.css";
import { toggleContent } from "../../../store/display";

const Contents = () => {
  const dispatch = useAddDispatch();
  const chapter = (s: RootState) => s.chapter.contentId;
  const contentId = useAppSelector(chapter);
  const loading = (s: RootState) => s.loading.loading;
  const loadingState = useAppSelector(loading);
  const content = (s: RootState) => s.chapter.contents.data;
  const contentData = useAppSelector(content);
  const [mode, setMode] = useState(true);
  const fontRef = useRef<HTMLStyleElement>(null);

  let count = 15;
  useEffect(() => {
    if (contentId === "") return;
    dispatch(fetchContentData(contentId));
  }, [contentId]);
  const handleClose = () => {
    dispatch(toggleContent(false));
  };
  const increaseFontSize = () => {
    count++;
    if (fontRef.current !== null) {
      fontRef.current.style.fontSize = `${count}px`;
    }
  };
  const decreaseFontSize = () => {
    count--;
    if (fontRef.current !== null) {
      fontRef.current.style.fontSize = `${count}px`;
    }
  };
  return (
    <div className={`content ${mode ? "light" : "dark"}`}>
      {loadingState.loadContent && (
        <FetchingData styleClass={"Load__Recomended"} show={true} />
      )}
      {!contentData && <NoBooks text="oops,cannot load contents" />}
      {contentData && !loadingState.loadContent && (
        <article ref={fontRef}>
          {contentData.map((item, index) => (
            <p key={item + index}>{item}</p>
          ))}
        </article>
      )}
      <div className="control">
        <button>
          <AiOutlineZoomIn onClick={increaseFontSize} className="zoomIn" />
        </button>
        <button>
          <AiOutlineZoomOut onClick={decreaseFontSize} className="zoomOut" />
        </button>
        <button onClick={() => setMode(!mode)}>
          {mode ? (
            <WiDaySunny className="sunny" />
          ) : (
            <MdModeNight className="moon" />
          )}
        </button>
        <button onClick={handleClose}>
          <MdClose className="closeContent" />
        </button>
      </div>
    </div>
  );
};

export default Contents;
