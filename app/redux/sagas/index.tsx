import { all, fork, AllEffect, ForkEffect } from "redux-saga/effects"
import getUserInfor from "./users"

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([fork(getUserInfor)])
}
