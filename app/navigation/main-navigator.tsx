/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

// UnAuth
import Login from "@screens/Auth/Login"
import Launching from "@screens/Auth/Launching"
import Register from "@screens/Auth/Register"

// Auth
import Home from "@screens/Home"

// news
import News from "@screens/News"
import NewsDetail from "@screens/News/NewsDetail"

// Feedback
import Feedback from "@screens/Feedback"

// Utility
import ViewPdf from "@screens/ViewPdf"

import AppInstruction from "@screens/AppInstruction"
import MapEvent from "@screens/MapEvent"
import KPIStatus from "@screens/KPIStatus"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  Launching: undefined
  ViewPdf: undefined
  Home: undefined
  Login: undefined
  AppInstruction: undefined
  KPIStatus: undefined
  MapEvent: undefined
  Register: undefined
  News: undefined
  NewsDetail: undefined
  Feedback: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<PrimaryParamList>()

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Launching"
    >
      {/** Unauth */}
      <Stack.Screen name="Launching" component={Launching} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AppInstruction" component={AppInstruction} />
      <Stack.Screen name="Register" component={Register} />

      {/** home */}
      <Stack.Screen name="Home" component={Home} />

      {/** News */}
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} />

      {/** feedback */}
      <Stack.Screen name="Feedback" component={Feedback} />

      {/** kpi */}
      <Stack.Screen name="KPIStatus" component={KPIStatus} />

      {/** MapEvent */}
      <Stack.Screen name="MapEvent" component={MapEvent} />

      {/** Utility */}
      <Stack.Screen name="ViewPdf" component={ViewPdf} />
    </Stack.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["TabHome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
