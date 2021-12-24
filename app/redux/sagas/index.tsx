import { all, fork, AllEffect, ForkEffect } from "redux-saga/effects"
import getUserInfor from "./users"
import getInitState from "./initState"
import getAuthorityInfoSaga from "./authorityInfo"

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(getUserInfor), fork(getInitState), fork(getAuthorityInfoSaga)])
}
