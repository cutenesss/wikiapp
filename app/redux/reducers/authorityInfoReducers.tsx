import { IAuthorityResponse } from "../../types"
import { GET_AUTHORITY_INFO_ACTION } from "../actions/actionTypes"

export type uploadAction = {
  type: string
  data: IAuthorityResponse
}

const defaultState = {
  authority: {},
  loading: false,
}

export default (stateUpload = defaultState, action: uploadAction) => {
  switch (action.type) {
    case GET_AUTHORITY_INFO_ACTION.GET_AUTHORITY_INFO_REQUESTED: {
      return {
        ...stateUpload,
        loading: true,
      }
    }
    case GET_AUTHORITY_INFO_ACTION.GET_AUTHORITY_INFO_SUCCEEDED: {
      return {
        ...stateUpload,
        loading: false,
        authority: action.data,
      }
    }
    case GET_AUTHORITY_INFO_ACTION.GET_AUTHORITY_INFO_FAILED: {
      return {
        ...stateUpload,
        loading: false,
      }
    }
    default:
      return stateUpload
  }
}
