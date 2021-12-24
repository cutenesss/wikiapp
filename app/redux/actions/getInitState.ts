import { IBodyInit, IResponseInit } from "@types"
import { INIT_ACTION } from "./actionTypes"

export const getInitStateAction = (body: IBodyInit) => {
  return {
    type: INIT_ACTION.INIT_STATE_REQUESTED,
    payload: body,
  }
}

export const updateDirectlyInitStateAction = (body: IResponseInit) => {
  return {
    type: INIT_ACTION.UPDATE_INIT_STATE,
    state: body,
  }
}
