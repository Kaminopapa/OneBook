import React, { useState } from "react";
import { RootState, useAppSelector, useAddDispatch } from "../../../store";
import classes from "./styles/header.module.css";
import { AiOutlineStar } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { remove } from "../../../store/collection";

const Header = () => {
  const dispatch = useAddDispatch();
  const [showCollection, setShowCollecton] = useState(false);

  const collections = (s: RootState) => s.collection;
  const selectedState = useAppSelector(collections);
  const handleDelete = (id: string) => {
    dispatch(remove(id));
  };
  const handleChapter = (id: string) => {};
  return (
    <>
      <header className={classes.header}>
        <h1>One Book</h1>
        <div
          className={classes.star_wrapper}
          onClick={() => setShowCollecton(!showCollection)}
        >
          <AiOutlineStar className={classes.star} />
          <p className={classes.badge}>{selectedState.count}</p>
        </div>
      </header>
      {showCollection && selectedState.items.length != 0 && (
        <div className={classes.collections}>
          {selectedState.items.map((item) => (
            <div
              className={classes.collections_list}
              onClick={() => handleChapter(item.id)}
            >
              <img src={item.cover} alt={item.name} />

              <MdClose
                className={classes.close}
                onClick={() => handleDelete(item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
