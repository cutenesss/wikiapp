import { DIALOG_STATE } from "./actionTypes"

type ContentNoti = {
  isVisible: boolean
  title?: string
  content?: string
  onPress?: (value?: any) => void
  onPressCancel?: (value?: any) => void
}

export const changeDialogContent = (payload: ContentNoti) => {
  return {
    type: DIALOG_STATE.CHANGE_CONTENT,
    payload,
  }
}

export const changeDialogConfirmContent = (payload: ContentNoti) => {
  return {
    type: DIALOG_STATE.CHANGE_CONTENT_CONFIRM,
    payload,
  }
}
