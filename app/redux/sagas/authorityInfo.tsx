import { put, takeEvery, call } from "redux-saga/effects"
import { GET_AUTHORITY_INFO_ACTION } from "../actions/actionTypes"
import { getAuthorityInfo } from "@apis/functions/user"
import STATUS from "@apis/status"

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchAuthorityInfo(action) {
  try {
    const response = yield call(getAuthorityInfo, action.payload)
    if (response?.code === STATUS.SUCCESS) {
      yield put({
        type: GET_AUTHORITY_INFO_ACTION.GET_AUTHORITY_INFO_SUCCEEDED,
        state: response.data,
      })
    } else {
      yield put({ type: GET_AUTHORITY_INFO_ACTION.GET_AUTHORITY_INFO_FAILED })
    }
  } catch (e) {
    // console.log("error_errror", JSON.stringify(e))
    yield put({ type: GET_AUTHORITY_INFO_ACTION.GET_AUTHORITY_INFO_FAILED, message: e.message })
  }
}

function* getAuthorityInfoSaga() {
  yield takeEvery(GET_AUTHORITY_INFO_ACTION.GET_AUTHORITY_INFO_REQUESTED, fetchAuthorityInfo)
}

export default getAuthorityInfoSaga
