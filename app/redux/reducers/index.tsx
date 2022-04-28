import { combineReducers } from "redux"
import searchListReducers from "./searchListReducers"
import dialogStateReducers from "./dialogStateReducers"
import dialogConfirmStateReducers from "./dialogConfirmStateReducers"
import refreshListReducers from "./refreshListReducers"

import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux"
const rootReducers = combineReducers({
  searchListReducers,
  dialogStateReducers,
  dialogConfirmStateReducers,
  refreshListReducers,
})

export const useSelector: TypedUseSelectorHook<ReturnType<typeof rootReducers>> = useReduxSelector
export default rootReducers
