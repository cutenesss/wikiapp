import { combineReducers } from "redux"
import userReducers from "./userReducers"
import dialogStateReducers from "./dialogStateReducers"
import dialogConfirmStateReducers from "./dialogConfirmStateReducers"

import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux"
const rootReducers = combineReducers({
  userReducers,
  dialogStateReducers,
  dialogConfirmStateReducers
})

export const useSelector: TypedUseSelectorHook<ReturnType<typeof rootReducers>> = useReduxSelector
export default rootReducers
