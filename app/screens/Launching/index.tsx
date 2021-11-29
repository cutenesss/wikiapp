import React, { useEffect, useRef } from "react"
import { Image, StyleSheet, SafeAreaView, StatusBar } from "react-native"
import R from "@assets/R"
import { getFont, getLineHeight, HEIGHT, WIDTH } from "@configs/functions"
import { translate } from "@i18n"
import { replace } from "@navigation/navigation-service"
import AsyncStorageUtils from "@utils/AsyncStorageUtils"
import { rootServerInstance } from "@apis/helpers"
import { useDispatch } from "react-redux"
import { useSelector } from "@redux/reducers"
import { getUserProfile } from "@redux/actions/userAction"
import * as Animatable from "react-native-animatable"
import { logout } from "@apis/functions/user"
import ScreenName from "@navigation/screen-name"

type Props = {
  route: {
    params: {
      isExpired: boolean
    }
  }
}

const Launching = (props: Props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    checkTokenExpired()
  }, [])

  const checkTokenExpired = async () => {
    const isExpired = props.route.params?.isExpired
    isExpired ? resetAccount() : checkUserData()
  }

  const resetAccount = async () => {
    await logout()
    await AsyncStorageUtils.remove(AsyncStorageUtils.KEY.USER_DATA)
    await AsyncStorageUtils.remove(AsyncStorageUtils.KEY.PASSWORD)
    replace(ScreenName.Launching)
  }

  const checkUserData = async () => {
    try {
      const userData = await AsyncStorageUtils.get(AsyncStorageUtils.KEY.USER_DATA)
      let screenName = ""
      // console.log("userCheck_userCheck", userData)
      if (userData === null) {
        screenName = ScreenName.Login
      } else {
        const userDataParse = JSON.parse(userData)
        const userCheck = userDataParse !== null ? userDataParse : { accessToken: "" }
        rootServerInstance.setHeader("Authorization", `Bearer ${userCheck.accessToken}`)
        screenName = ScreenName.TabHome
      }
      replace(screenName)
    } catch (error) {
      // console.log("SOME_THING_WRONG", error)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={R.colors.white} />
      <Animatable.View animation="bounceIn" direction="alternate" duration={3000}>
        <Image resizeMode="contain" style={styles.logo} source={R.images.logoApp} />
      </Animatable.View>
      <Animatable.Text duration={2000} animation="fadeIn" style={styles.textpromote}>
        {translate("APP_NAME")?.toUpperCase()}
      </Animatable.Text>
    </SafeAreaView>
  )
}
export default Launching
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    flex: 1,
  },
  logo: {
    height: WIDTH(200),
    marginTop: HEIGHT(250),
    width: WIDTH(200),
  },
  textpromote: {
    color: R.colors.primary,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(20),
    fontWeight: "bold",
    lineHeight: getLineHeight(28),
    marginTop: HEIGHT(27),
  },
})
