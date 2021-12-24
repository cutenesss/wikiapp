import { put, takeEvery, call } from "redux-saga/effects"
import { INIT_ACTION } from "../actions/actionTypes"
import { checkAndInit } from "@apis/functions/user"
import STATUS from "@apis/status"

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchInitState(action) {
  try {
    const response = yield call(checkAndInit, action.payload)
    console.log("payload", action.payload)
    console.log("response", response)
    if (response?.code === STATUS.SUCCESS) {
      yield put({ type: INIT_ACTION.INIT_STATE_REQUESTED_SUCCEEDED, state: response.data })
    } else {
      yield put({ type: INIT_ACTION.INIT_STATE_REQUESTED_FAILED })
    }
  } catch (e) {
    // console.log("error_errror", JSON.stringify(e))
    yield put({ type: INIT_ACTION.INIT_STATE_REQUESTED_FAILED, message: e.message })
  }
}

function* getInitState() {
  yield takeEvery(INIT_ACTION.INIT_STATE_REQUESTED, fetchInitState)
}

export default getInitState
