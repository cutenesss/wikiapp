import { put, takeEvery, call } from "redux-saga/effects"
import { USER_ACTION } from "../actions/actionTypes"
import { getMyProfile } from "@apis/functions/user"
import STATUS from "@apis/status"

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
  try {
    console.log("action.session", action.session)
    const userResponse = yield call(getMyProfile, action.session)
    console.log("userResponse", userResponse)
    if (userResponse?.code === STATUS.SUCCESS) {
      yield put({ type: USER_ACTION.USER_FETCH_SUCCEEDED, user: userResponse.data })
    } else {
      yield put({ type: USER_ACTION.USER_FETCH_FAILED })
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
