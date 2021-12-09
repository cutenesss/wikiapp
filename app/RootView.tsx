import React, { Component } from "react"
import { StyleSheet, View, Platform } from "react-native"
import { connect } from "react-redux"
import OneSignal from "react-native-onesignal"
import * as eva from "@eva-design/eva"
import theme from "./theme.json"
import mapping from "./mapping.json"

import { RootSiblingParent } from "react-native-root-siblings"
import { ApplicationProvider } from "@ui-kitten/components"

import AsyncStorageUtils from "./utils/AsyncStorageUtils"
import { OneSignalKey } from "./env"

import CustomDialog from "@common/CustomDialog"
import NoInternet from "./common/NoInternet"
import CustomConfirmDialog from "@common/CustomConfirmDialog"

// import env from "./env"
import R from "./assets/R"
// import NotificationFirebase from './helpers/NotificationFirebase'
import { getUserProfile } from "./redux/actions/userAction"

import { defaultBody } from "@configs/constant"

import { reset } from "@navigation/navigation-service"

import global from "./global"
import { translate } from "@i18n"

const SHORT_DELAY = 400
const LONG_DELAY = 4500

class RootView extends Component<{
  getUserProfile?: () => void
}> {
  timeout: any
  constructor(props) {
    super(props)
    this.state = {}

    if (Platform.OS === "ios") {
      OneSignal.promptForPushNotificationsWithUserResponse((response) => {
        // console.log("Prompt response:", response)
      })
    }
    OneSignal.setAppId(OneSignalKey)
    OneSignal.setLogLevel(6, 0)

    OneSignal.setNotificationWillShowInForegroundHandler((notifReceivedEvent) => {
      // console.log("OneSignal: notification will show in foreground:", notifReceivedEvent)
      const notif = notifReceivedEvent.getNotification()
      this.onReceived(notif)
    })
    OneSignal.setNotificationOpenedHandler((notification) => {
      this.onOpened(notification)
    })
    this.timeout = null
  }

  onReceived = (notification) => {
    // console.log("notification_notification", notification)
    // this.props.getUserProfile?.()
  }

  onOpened = async ({ notification, action }) => {
    // console.log("onOpened_noti", notification, action)
    // const timeDelay = global.isOpened ? SHORT_DELAY : LONG_DELAY
    // const userData = await AsyncStorageUtils.get(AsyncStorageUtils.KEY.USER_DATA)
    // const userDataParse = JSON.parse(userData)
    // clearTimeout(this.timeout)
    // this.timeout = setTimeout(async () => {
    // }, timeDelay)
  }

  componentDidMount() {
    this.onIds()
  }

  onIds = async () => {
    const deviceState = await OneSignal.getDeviceState()
    AsyncStorageUtils.save(AsyncStorageUtils.KEY.SAVE_TOKEN_NOTI, deviceState.userId)
  }

  render() {
    return (
      <>
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
          <View style={styles.container}>
            <RootSiblingParent>
              {this.props.children}
              <NoInternet />
              <CustomDialog />
              <CustomConfirmDialog />
            </RootSiblingParent>
          </View>
        </ApplicationProvider>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

function mapStateToProps(state) {
  return {}
}
export default connect<any, any, any>(mapStateToProps, {
  getUserProfile,
})(RootView)
