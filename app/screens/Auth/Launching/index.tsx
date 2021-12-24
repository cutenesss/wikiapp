import React, { useEffect } from "react"
import { Image, StyleSheet, ImageBackground } from "react-native"
import DeviceInfo from "react-native-device-info"
import * as Animatable from "react-native-animatable"
import auth from "@react-native-firebase/auth"
import * as Keychain from "react-native-keychain"
import { useDispatch } from "react-redux"
import { isNil } from "lodash"

import { getInitStateAction } from "@redux/actions/getInitState"

import R from "@assets/R"
import { replace } from "@navigation/navigation-service"
import { WIDTH } from "@configs/functions"
import AsyncStorageUtils from "@utils/AsyncStorageUtils"

import ScreenName from "@navigation/screen-name"
import CustomStatusBar from "@common/CustomStatusBar"

const Launching = () => {
  const dispatch = useDispatch()

  const timeout = React.useRef(null)
  const timeoutGet = React.useRef(null)

  useEffect(() => {
    logInFirebase()
    return () => {
      clearTimeout(timeout.current)
      clearTimeout(timeoutGet.current)
    }
  }, [])

  const logInFirebase = async () => {
    const deviceId = await DeviceInfo.getAndroidId()
    const user = auth().currentUser
    let token = ""
    if (!isNil(user)) {
      token = await user.getIdToken()
      checkUserData(token)
    } else {
      auth()
        .createUserWithEmailAndPassword(`${deviceId}@example.com`, deviceId)
        .then(async () => {
          const user = auth().currentUser
          token = await user.getIdToken()
          checkUserData(token)
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            auth()
              .signInWithEmailAndPassword(`${deviceId}@example.com`, deviceId)
              .then(async () => {
                const user = auth().currentUser
                token = await user.getIdToken()
                checkUserData(token)
              })
          }
          if (error.code === "auth/invalid-email") {
            // console.log('That email address is invalid!')
          }
        })
    }
  }

  const checkUserData = async (token: string) => {
    try {
      const isFirstOpen = await AsyncStorageUtils.get(AsyncStorageUtils.KEY.FIRST_OPEN_APP)
      const credentials = await Keychain.getGenericPassword()
      const deviceId = await DeviceInfo.getUniqueId()
      let screenName = ""
      let isLogin = 0
      // console.log("userCheck_userCheck", userData)
      if (credentials) {
        isLogin = 1
      }
      const body = {
        session_id: "",
        token_id: token,
        device_id: deviceId,
        is_login: isLogin,
      }
      timeoutGet.current = setTimeout(() => {
        dispatch(getInitStateAction(body))
      }, 200)
      if (isFirstOpen === null) {
        screenName = ScreenName.AppInstruction
        await AsyncStorageUtils.save(AsyncStorageUtils.KEY.FIRST_OPEN_APP, "Ok")
      } else {
        screenName = ScreenName.Home
      }
      timeout.current = setTimeout(() => {
        replace(screenName)
      }, 2500)
    } catch (error) {
      console.log("SOME_THING_WRONG", error)
    }
  }
  return (
    <ImageBackground source={R.images.loadingScreen} style={styles.container} resizeMode="stretch">
      <CustomStatusBar backgroundColor={R.colors.transparent} />
      <Animatable.View animation="bounceIn" direction="alternate" duration={3000}>
        <Image resizeMode="contain" style={styles.logo} source={R.images.cditLoadingScreen} />
      </Animatable.View>
    </ImageBackground>
  )
}
export default Launching
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    height: WIDTH(120),
    width: WIDTH(120),
  },
})
