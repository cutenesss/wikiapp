import { IAuthorityBody } from "@types"
import { GET_AUTHORITY_INFO_ACTION } from "./actionTypes"

export const getAuthorityInfoAction = (payload: IAuthorityBody) => {
  return {
    type: GET_AUTHORITY_INFO_ACTION.GET_AUTHORITY_INFO_REQUESTED,
    payload,
  }
}
