import { USER_ACTION } from "./actionTypes"

export const getUserProfile = (session: string) => {
  return {
    type: USER_ACTION.USER_FETCH_REQUESTED,
    session,
  }
}
