import React from "react";
import { BsSearch } from "react-icons/bs";
import classes from "./styles/horizontalWrapper.module.css";
interface HorizonProps {
  children: React.ReactNode;
}
const HorizontalWrapper = (props: HorizonProps) => {
  return (
    <div className={classes.hello}>
      <div className={classes.introduction}>
        <h2>滚动鼠标查看更多</h2>
        <p>Or</p>
        <button>
          <a href="#search">
            <BsSearch color="yellow" size={"3em"} style={{ margin: "10px" }} />
          </a>
        </button>
        <h2>你感兴趣的</h2>
      </div>
      {props.children}
    </div>
  );
};

export default HorizontalWrapper;
