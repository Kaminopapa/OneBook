//get API by using axio
//API sources: LRY_API
import axios from "axios";
import IBook, {
  Ibooks,
  IChaptersData,
  IChapterList,
} from "../interfaces/IBook";

class BooksApi {
  http = axios.create({
    baseURL: "https://api.pingcc.cn/",
  });

  async getFictions() {
    const response = await this.http.get<Ibooks>(
      `/fiction/search/fictionType/科幻`
    );

    return response.data;
  }
  async searchFictions(type: string) {
    const response = await this.http.get<Ibooks>(
      `fiction/search/fictionType/${type}`
    );
    return response.data;
  }
  async getChapters(id: string) {
    return await this.http
      .get<IChaptersData>(`fictionChapter/search/${id}`)
      .then((res) => {
        return res.data.data;
      });
  }
}

export default new BooksApi();
