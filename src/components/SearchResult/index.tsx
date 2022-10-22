import React, { useState, useMemo } from "react";
import classes from "./styles/styles.module.css";
import GridWrapper from "../UI/GridBooks/GridBooks";
import EachBook from "../UI/EachBook";
import { RootState, useAppSelector, useAddDispatch } from "../../store";

import Pagination from "../UI/pagination/Pagination";
import Loading from "../UI/Loading/FetchingData";
import NoBooks from "../UI/NoBooks/NoBooks";
let PageSize = 10;
const index = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const books = (s: RootState) => s.books.result;
  const loading = (s: RootState) => s.loading.loading;

  const bookState = useAppSelector(books);
  const loadingState = useAppSelector(loading);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (bookState) {
      return bookState.slice(firstPageIndex, lastPageIndex);
    }
  }, [currentPage, bookState]);

  console.log(currentTableData);
  // useEffect(() => {
  //   if (id === "") return;
  //   dispatch(fetchChapterData(id));
  // }, [id]);
  const resultRender = (
    <div className={classes.result__section}>
      <GridWrapper>
        {currentTableData &&
          currentTableData.map((item) => (
            <EachBook
              key={item.fictionId}
              item={item}
              card={classes.result__card}
              imageContainer={classes.result__cover}
              detail={classes.result__detail}
            />
          ))}
      </GridWrapper>
      <Pagination
        className={classes.pagination_bar}
        currentPage={currentPage}
        totalCount={(bookState && bookState.length) || 0}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
      <br />
    </div>
  );
  return (
    <>
      {loadingState.loadBook && (
        <Loading show={true} styleClass={"Load__Recomended"} />
      )}
      {!loadingState.loadBook && !currentTableData && (
        <NoBooks
          text={
            "sorry, couldn't get your search! Try to change your input: 玄幻"
          }
        />
      )}
      {!loadingState.loadBook && bookState && resultRender}
    </>
  );
};

export default index;
