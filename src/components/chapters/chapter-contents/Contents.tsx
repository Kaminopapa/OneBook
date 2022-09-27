import React, { useContext, useEffect, useState, useRef } from "react";
import NoBooks from "../../UI/NoBooks/NoBooks";
import BookApi from "../../../services/BookApi";
import { BookCtx } from "../../../store/BookProvider";
import FetchingData from "../../UI/Loading/FetchingData";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { WiDaySunny } from "react-icons/wi";
import { MdModeNight, MdClose } from "react-icons/md";
import "./styles/Content.css";

interface contentProps {
  onClose: () => void;
}
const Contents = (props: contentProps) => {
  const [content, setContent] = useState({ isLoading: true, data: [] });
  const [err, setErr] = useState("");
  const [mode, setMode] = useState(true);
  const ctx = useContext(BookCtx);
  const fontRef = useRef<HTMLStyleElement>(null);
  let count = 15;
  useEffect(() => {
    async function fetchContent() {
      const api = await BookApi.getContent(ctx.contentId);
      setContent({ isLoading: false, data: api.data });
    }
    fetchContent().catch((err) => {
      setContent((state) => ({ ...state, isLoading: false }));
      setErr(err.message);
    });
  }, [ctx.contentId]);
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
      {content.isLoading && (
        <FetchingData styleClass={"Load__Recomended"} show={true} />
      )}
      {!content.data || (content.data.length === 0 && <NoBooks text={err} />)}
      {content.data && !content.isLoading && (
        <article ref={fontRef}>
          {content.data.map((item, index) => (
            <p key={item + index}>{item}</p>
          ))}
          <div className="control">
            <button>
              <AiOutlineZoomIn onClick={increaseFontSize} className="zoomIn" />
            </button>
            <button>
              <AiOutlineZoomOut
                onClick={decreaseFontSize}
                className="zoomOut"
              />
            </button>
            <button onClick={() => setMode(!mode)}>
              {mode ? (
                <WiDaySunny className="sunny" />
              ) : (
                <MdModeNight className="moon" />
              )}
            </button>
            <button onClick={props.onClose}>
              <MdClose className="closeContent" />
            </button>
          </div>
        </article>
      )}
    </div>
  );
};

export default Contents;
