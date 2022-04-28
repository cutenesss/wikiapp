import { SEARCH_ACTION } from "./actionTypes"

export const searchListWiki = (payload: {word: string, offset: number}) => {
  return {
    type: SEARCH_ACTION.SEARCH_FETCH_REQUESTED,
    payload,
  }
}
