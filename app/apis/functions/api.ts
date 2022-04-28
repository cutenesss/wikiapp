import { getData } from "../helpers"
import URL from "../url"

export const getListSearchByWord = (data: {word: string, offset: number}) =>
  getData<any, { data: any }>({
    endpoint: `${URL.SEARCH}`,
    params: {
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: data.word,
      srlimit: 500,
      sroffset: data.offset
    },
  }).then((res) => res.data)
