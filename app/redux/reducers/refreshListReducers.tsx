import { REFRESH_LIST_ACTION } from "../actions/actionTypes"

const defaultState = {
  refresh: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REFRESH_LIST_ACTION.REFRESH_LIST: {
      return {
        refresh: !defaultState.refresh,
      }
    }
    default:
      return state
  }
}
