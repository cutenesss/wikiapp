import { IResponseInit } from "../../types"
import { INIT_ACTION } from "../actions/actionTypes"

export type uploadAction = {
  type: string
  state: IResponseInit
}

const defaultState: { loading: boolean; initState: IResponseInit } = {
  initState: undefined,
  loading: false,
}

export default (stateUpload = defaultState, action: uploadAction) => {
  switch (action.type) {
    case INIT_ACTION.INIT_STATE_REQUESTED: {
      return {
        ...stateUpload,
        loading: true,
      }
    }
    case INIT_ACTION.INIT_STATE_REQUESTED_SUCCEEDED: {
      return {
        ...stateUpload,
        loading: false,
        initState: action.state,
      }
    }
    case INIT_ACTION.UPDATE_INIT_STATE: {
      return {
        ...stateUpload,
        loading: false,
        initState: action.state,
      }
    }
    case INIT_ACTION.INIT_STATE_REQUESTED_FAILED: {
      return {
        ...stateUpload,
        loading: false,
      }
    }
    default:
      return stateUpload
  }
}
