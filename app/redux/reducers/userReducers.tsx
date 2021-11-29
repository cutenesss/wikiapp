import { IUserInformation } from "../../types"
import { USER_ACTION } from "../actions/actionTypes"
export type uploadAction = {
  type: string
  user: IUserInformation
}

const defaultState = {
  userInfo: {},
  loading: false,
}

export default (stateUpload = defaultState, action: uploadAction) => {
  switch (action.type) {
    case USER_ACTION.USER_FETCH_REQUESTED: {
      return {
        ...stateUpload,
        loading: true,
      }
    }
    case USER_ACTION.USER_FETCH_SUCCEEDED: {
      return {
        ...stateUpload,
        loading: false,
        userInfo: action.user,
      }
    }
    case USER_ACTION.USER_FETCH_FAILED: {
      return {
        ...stateUpload,
        loading: false,
      }
    }
    default:
      return stateUpload
  }
}
