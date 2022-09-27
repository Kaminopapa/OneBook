import React from "react";
import IBook from "../../interfaces/IBook";
import EachBook from "../UI/EachBook/EachBook";
import HorizontalScroll from "react-scroll-horizontal";
import { BsSearch } from "react-icons/bs";
interface RecomentProps {
  data: IBook[];
  matches: Boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const RecomendedList = (props: RecomentProps) => {
  const handleShow = () => props.setShow(true);
  const myFavorite: IBook = {
    fictionId: "d8e060c4-ccb4-3d2c-8042-709a944894ba",
    title: "夜的命名术",
    author: "会说话的肘子",
    fictionType: "都市言情",
    descs:
      "　　蓝与紫的霓虹中，浓密的钢铁苍穹下，数据洪流的前端，是科技革命之后的世界，也是现实与虚幻的分界。　　钢铁与身体，过去与未来。　　这里，表世界与里世界并存，面前的一切，像是时间之墙近在眼前。　　黑暗逐渐笼罩。　　可你要明白啊我的朋友，我们不能用温柔去应对黑暗，要用火。13583",
    cover: "http://api.pingcc.cn/fiction/img/夜的命名术/夜的命名术.jpg",
    updateTime: "2022-09-21 00:00:00",
    idLoading: false,
  };
  const newData: IBook[] = props.data.concat(myFavorite);
  return (
    <div className="hello">
      <div className="introduction">
        <h2>滚动鼠标查看更多</h2>
        <p>Or</p>
        <button>
          <a href="#search">
            <BsSearch color="yellow" size={"3em"} style={{ margin: "10px" }} />
          </a>
        </button>
        <h2>你感兴趣的</h2>
      </div>
      {/* 如果宽度小于1367px 不会有横向scroll */}
      <HorizontalScroll
        reverseScroll={true}
        style={{ height: "40vh" }}
        className={props.matches ? "bye" : "section__one"}
      >
        {newData.map((item) => (
          <EachBook
            key={item.fictionId}
            item={item}
            card={"Card"}
            imageContainer={"imageContainer"}
            detail={"detail"}
            handleShow={handleShow}
          />
        ))}
      </HorizontalScroll>
      <div className={props.matches ? "yaya" : "bye"}>
        {newData.map((item) => (
          <EachBook
            key={item.fictionId}
            item={item}
            card={"Card"}
            imageContainer={"imageContainer"}
            detail={"detail"}
            handleShow={handleShow}
          />
        ))}
      </div>
    </div>
  );
};

export default RecomendedList;
