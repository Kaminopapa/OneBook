import { getBooks, getResult } from "./books";
import BookApi from "../services/BookApi";
import {
  isLoadingBook,
  isLoadingChapter,
  isLoadingContent,
} from "../store/loading";

import { getChapter, getContents } from "./chapters";
import { getCollections } from "./collection";
//Todo 在这里完成所有的api fetch
//::还没试可不可以
//::是否加载中的状态也在这里写

export const fetchBooksData = () => {
  return async (dispatch: any) => {
    dispatch(isLoadingBook(true));
    const fetchData = async () => {
      const data = await BookApi.getFictions();
      if (!data) {
        throw new Error("Could not fetch books data");
      }
      return data;
    };
    try {
      const booksData = await fetchData();
      dispatch(getBooks({ books: booksData.data, name: "", result: [] }));
      dispatch(isLoadingBook(false));
    } catch (err) {
      console.log(`Error:${err}`);
      dispatch(isLoadingBook(false));
    }
  };
};

export const fetchChapterData = (id: string) => {
  return async (dispatch: any) => {
    dispatch(isLoadingChapter(true));
    const fetchData = async () => {
      const data = await BookApi.getChapters(id);
      if (!data) {
        throw new Error("Could not fetch Chapter data");
      }
      return data;
    };
    try {
      const chapterData = await fetchData();
      dispatch(getChapter(chapterData));
      dispatch(isLoadingChapter(false));
    } catch (err) {
      console.log(`Error:${err}`);
      dispatch(isLoadingChapter(false));
    }
  };
};

export const fetchContentData = (contentId: string) => {
  return async (dispatch: any) => {
    dispatch(isLoadingContent(true));
    const fetchData = async () => {
      const data = await BookApi.getContent(contentId);
      if (!data) {
        throw new Error("Could Not fetch content");
      }
      return data;
    };

    try {
      const contentData = await fetchData();
      dispatch(getContents(contentData));
      dispatch(isLoadingContent(false));
    } catch (err) {
      console.log(`Error:${err}`);
      dispatch(isLoadingContent(false));
    }
  };
};

export const fetchSearchResult = (name: string) => {
  return async (dispatch: any) => {
    dispatch(isLoadingBook(true));
    const fetchData = async () => {
      const data = await BookApi.searchFictions(name);
      if (!data) {
        throw new Error("Could not fetch result");
      }
      return data;
    };
    try {
      const resultData = await fetchData();
      dispatch(getResult({ result: resultData.data, name: name, books: [] }));
      dispatch(isLoadingBook(false));
    } catch (err) {
      console.log(`Error:${err}`);
      dispatch(isLoadingBook(false));
    }
  };
};
export const getLocalCollection = () => {
  return (dispatch: any) => {
    const localCollections = localStorage.getItem("collections");
    if (localCollections) {
      const items = JSON.parse(localCollections);
      for (let i = 0; i < items.length; i++) {
        dispatch(getCollections(items[i]));
      }
    }
  };
};
