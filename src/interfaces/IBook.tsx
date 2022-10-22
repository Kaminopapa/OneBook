//define each books shapes
export interface Ibooks {
  msg: string;
  code: number;
  count: number;
  isLoading: boolean;
  data: IBook[];
}

export default interface IBook {
  fictionId: string;
  title: string;
  author: string;
  descs: string;
  cover: string;
  fictionType: string;
  updateTime: string;
  idLoading: Boolean;
}

export interface IChaptersData {
  msg: string;
  code: number;
  count: number;
  data: IChapters;
}
export interface IChapters {
  fictionId: string;
  title: string;
  descs: string;
  cover: string;
  author: string;
  fictionType: string;
  updateTime: string;
  isLoading: boolean;
  chapterList: IChapterList[];
}
export interface IChapterList {
  title: string;
  chapterId: string;
}
export interface IContent {
  msg: string;
  code: number;
  count: number;
  data: [];
}
