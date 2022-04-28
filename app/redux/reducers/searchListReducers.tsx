import { SEARCH_ACTION } from "../actions/actionTypes"

export type uploadAction = {
  type: string
  searchWord: string
  searchList: any
}

const defaultState: { loading: boolean; searchList: any, searchWord: string } = {
  searchList: [],
  searchWord: 'Developer',
  loading: false,
}

export default (initiateState = defaultState, action: uploadAction) => {
  switch (action.type) {
    case SEARCH_ACTION.SEARCH_FETCH_REQUESTED: {
      return {
        ...initiateState,
        loading: true,
      }
    }
    case SEARCH_ACTION.SEARCH_FETCH_SUCCEEDED: {
      return {
        ...initiateState,
        loading: false,
        searchList: action.searchList,
        searchWord: action.searchWord,
      }
    }
    case SEARCH_ACTION.SEARCH_FETCH_FAILED: {
      return {
        ...initiateState,
        loading: false,
      }
    }
    default:
      return initiateState
  }
}
