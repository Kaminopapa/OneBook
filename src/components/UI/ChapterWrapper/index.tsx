import React from "react";
import ReactDom from "react-dom";
import "./styles/ChapterWrapper.css";

interface wrapperProps {
  children?: React.ReactNode;
  show: Boolean;
}

const ChapterWrapper = (props: wrapperProps) => {
  return (
    <div>
      <div className="fiction__chapter">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("chapterRoot") as HTMLElement;
const Modal = (props: wrapperProps) => {
  return (
    <>
      {ReactDom.createPortal(
        <ChapterWrapper show={props.show}>{props.children}</ChapterWrapper>,
        portalElement
      )}
    </>
  );
};
export default Modal;
