import React from "react";
import "./FetchingData.css";
interface FetchingDataProps {
  show?: boolean;
  styleClass: string;
}

const FetchingData = (props: FetchingDataProps) => {
  return (
    <div className={props.show ? `${props.styleClass}` : "no__wrapper"}>
      <div className="loader"></div>
    </div>
  );
};

export default FetchingData;
