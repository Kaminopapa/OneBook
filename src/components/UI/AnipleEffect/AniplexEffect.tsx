import React from "react";
import "./styles/AniplexEffect.css";
type SampleProps = {
  text: string;
  tagLine: string;
};
const AniplexEffect = (props: SampleProps) => {
  let textArray = props.text.split("");
  let count = 0;
  return (
    <div className="box">
      {textArray.map((letter, index) => (
        <div key={letter + index} className="chars">
          {letter.toUpperCase()}
        </div>
      ))}
      {textArray.map((letterEffect, index) => (
        <div
          key={index + letterEffect}
          className={`ll ${letterEffect.toLowerCase()}${count++}`}
        ></div>
      ))}
      <div className="pcov"></div>
      <div className="tagLine">
        <h3>{props.tagLine}</h3>
      </div>
    </div>
  );
};

export default AniplexEffect;
