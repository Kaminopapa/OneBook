import React, { useState } from "react";
import { RootState, useAppSelector, useAddDispatch } from "../../../store";
import classes from "./styles/header.module.css";
import { AiOutlineStar } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { remove } from "../../../store/collection";
import EachBook from "../EachBook";

const Header = () => {
  const dispatch = useAddDispatch();
  const [showCollection, setShowCollecton] = useState(false);

  const collections = (s: RootState) => s.collection;
  const selectedState = useAppSelector(collections);
  const handleDelete = (id: string) => {
    dispatch(remove(id));
  };

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
            <div className={classes.collections__list}>
              <EachBook
                key={item.fictionId}
                item={item}
                card={classes.collected__card}
                detail={classes.collected__detail}
                imageContainer={classes.collected__cover}
              />
              <MdClose
                className={classes.close}
                onClick={() => handleDelete(item.fictionId)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
