import { USER_ACTION } from "./actionTypes"

export const getUserProfile = () => {
  return {
    type: USER_ACTION.USER_FETCH_REQUESTED,
  }
}

export const refreshDataActivity = () => {
  return {
    type: USER_ACTION.REFRESH_ACTIVITY,
  }
}
