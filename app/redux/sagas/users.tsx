import { put, takeEvery, call } from "redux-saga/effects"
import { USER_ACTION } from "../actions/actionTypes"
import { getMyProfile } from "@apis/functions/user"

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser() {
  try {
    const userResponse = yield call(getMyProfile)
    if (userResponse.data.data) {
      yield put({ type: USER_ACTION.USER_FETCH_SUCCEEDED, user: userResponse.data.data })
    }
  } catch (e) {
    // console.log("error_errror", JSON.stringify(e))
    yield put({ type: USER_ACTION.USER_FETCH_FAILED, message: e.message })
  }
}

function* getUserInfor() {
  yield takeEvery(USER_ACTION.USER_FETCH_REQUESTED, fetchUser)
}

export default getUserInfor
