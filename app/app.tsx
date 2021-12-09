/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import { ModalService } from "@ui-kitten/components"
import React, { useEffect } from "react"
// import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./assets/theme/fonts" // expo
import * as storage from "./utils/storage"
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from "./navigation"
import { Provider } from "react-redux"
import { appStore } from "./stores/configureStore"
import RootView from "./RootView"
// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
import { enableScreens } from "react-native-screens"
import codePush from "react-native-code-push"
import * as Sentry from "@sentry/react-native"
import { navigationRef } from "./navigation/navigation-service"
import { LogBox, Platform, Text, TextInput } from "react-native"
import { CodePushKey } from "./env"

LogBox.ignoreLogs([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
])

enableScreens()
export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

ModalService.setShouldUseTopInsets = true
Sentry.init({
  dsn: "https://82fb69f21a9f4723ab15669cf7650831@o490362.ingest.sentry.io/5620458",
})

/**
 * This is the root component of our app.
 */
function App() {
  // const navigationRef = useRef<NavigationContainerRef>()
  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    initFont()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    TextInput.defaultProps = { ...(TextInput.defaultProps || {}), allowFontScaling: false }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Text.defaultProps = { ...(Text.defaultProps || {}), allowFontScaling: false }
    if (!__DEV__) {
      codePush.sync({
        deploymentKey: Platform.OS === "ios" ? CodePushKey.IOS : CodePushKey.ANDROID,
      })
    }
  }, [])

  const initFont = async () => {
    await initFonts() // expo
    Sentry.captureMessage("Hello Sentry!")
  }

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!appStore) return null
  // otherwise, we're ready to render the app
  return (
    <Provider store={appStore}>
      <RootView>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <RootNavigator
            ref={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </SafeAreaProvider>
      </RootView>
    </Provider>
  )
}

export default __DEV__ ? App : codePush(App)
