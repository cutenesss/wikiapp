import { put, takeEvery, call } from "redux-saga/effects"
import { SEARCH_ACTION } from "../actions/actionTypes"
import { getListSearchByWord } from "@apis/functions/api"

// worker Saga: will be fired on SEARCH_FETCH_SUCCEEDED actions
function * fetchListSearch(action) {
  try {
    const listSearchResponse = yield call(getListSearchByWord, action.payload)
    if (listSearchResponse?.query?.search) {
      yield put({ type: SEARCH_ACTION.SEARCH_FETCH_SUCCEEDED, searchList: listSearchResponse.query.search, searchWord: action.payload.word })
    } else {
      yield put({ type: SEARCH_ACTION.SEARCH_FETCH_FAILED })
    }
  } catch (e) {
    // console.log("error_errror", JSON.stringify(e))
    yield put({ type: SEARCH_ACTION.SEARCH_FETCH_FAILED, message: e.message })
  }
}

function * getListSearch() {
  yield takeEvery(SEARCH_ACTION.SEARCH_FETCH_REQUESTED, fetchListSearch)
}

export default getListSearch
