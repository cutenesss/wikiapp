import { DIALOG_STATE } from "../actions/actionTypes"

export type uploadAction = {
  type: string
  payload: {
    isVisible: boolean
    title: string
    content: string
    onPress?: (value?: any) => void
  }
}

const defaultState = {
  isVisible: false,
  title: "",
  content: "",
  onPress: null,
}

export default (state = defaultState, action: uploadAction) => {
  switch (action.type) {
    case DIALOG_STATE.CHANGE_CONTENT: {
      return action.payload
    }
    default:
      return state
  }
}
