import Reactotron, { ReactotronReactNative } from "reactotron-react-native"
import { reactotronRedux } from "reactotron-redux"
import sagaPlugin from "reactotron-redux-saga"
import { NativeModules } from "react-native"

const dev = __DEV__

function configure(): ReactotronReactNative {
  if (dev) {
    const scriptURL = NativeModules.SourceCode.scriptURL
    const address = scriptURL.split("://")[1].split("/")[0]
    const hostname = address.split(":")[0]
    Reactotron.configure({
      name: "react-native-ais",
      host: hostname,
    }) // controls connection & communication settings
      .useReactNative() // add all built-in react native plugins
      .use(sagaPlugin({}))
      .use(reactotronRedux())
    return Reactotron.connect()
  }
  return Reactotron.connect()
}

export default {
  configure,
}
