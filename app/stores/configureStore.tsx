/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ReactotronConfig from "../utils/ReactotronConfig"
import { applyMiddleware, createStore, Middleware, compose } from "redux"
import rootReducer from "@redux/reducers"
import createSagaMiddleware from "redux-saga"
import Reactotron from "reactotron-react-native"
import rootSaga from "@redux/sagas"

const reactotron = ReactotronConfig.configure()
let sagaMiddleware = createSagaMiddleware()

if (__DEV__) {
  const sagaMonitor = Reactotron.createSagaMonitor?.()
  if (sagaMonitor) {
    sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  }
}

function configureStore(reactotron, sagaMiddleware: Middleware) {
  const maybeEnhancer = reactotron?.createEnhancer?.()
  return createStore(
    rootReducer,
    maybeEnhancer
      ? compose(applyMiddleware(sagaMiddleware), maybeEnhancer)
      : applyMiddleware(sagaMiddleware),
  )
}

export const appStore = configureStore(reactotron, sagaMiddleware)
Reactotron.clear?.()
sagaMiddleware.run(rootSaga)
