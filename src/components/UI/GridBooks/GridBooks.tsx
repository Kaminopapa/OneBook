import React from "react";
import classes from "./style/gridBooks.module.css";
interface gridProps {
  children: React.ReactNode;
}
const GridBooks = (props: gridProps) => {
  return (
    <div className={`section ${classes.section__two}`} id="asd">
      <div className={classes.card__list}>{props.children}</div>
    </div>
  );
};

export default GridBooks;
