import React from "react";
import ReactDom from "react-dom";
import "./styles/ChapterWrapper.css";
interface wrapperProps {
  children?: React.ReactNode;
  show: Boolean;
  onClose: () => void;
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
        <ChapterWrapper show={props.show} onClose={props.onClose}>
          {props.children}
        </ChapterWrapper>,
        portalElement
      )}
    </>
  );
};
export default Modal;
