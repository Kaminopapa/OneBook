import React from "react";
interface errProps {
  text: String;
}
const NoBooks = (props: errProps) => {
  return (
    <p
      style={{
        color: "#FF425E;",
        textAlign: "center",
      }}
    >
      {props.text}
    </p>
  );
};

export default NoBooks;
