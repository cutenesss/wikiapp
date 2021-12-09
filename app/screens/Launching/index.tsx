import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { rootServerInstance } from "@apis/helpers"
import { useDispatch } from "react-redux"

import { getUserProfile } from "@redux/actions/userAction"

import R from "@assets/R"
import { replace } from "@navigation/navigation-service"
import AsyncStorageUtils from "@utils/AsyncStorageUtils"

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
      const isFirstOpen = await AsyncStorageUtils.get(AsyncStorageUtils.KEY.FIRST_OPEN_APP)
      const userData = await AsyncStorageUtils.get(AsyncStorageUtils.KEY.USER_DATA)
      let screenName = ""
      // console.log("userCheck_userCheck", userData)
      if (isFirstOpen === null) {
        screenName = ScreenName.AppInstruction
        // await AsyncStorageUtils.save(AsyncStorageUtils.KEY.FIRST_OPEN_APP, "Ok")
      } else {
        screenName = ScreenName.Home
        if (userData !== null) {
          const userDataParse = JSON.parse(userData)
          const userCheck = userDataParse !== null ? userDataParse : { accessToken: "" }
          rootServerInstance.setHeader("Authorization", `Bearer ${userCheck.accessToken}`)
          setTimeout(() => {
            dispatch(getUserProfile())
          }, 200)
        }
      }
      replace(screenName)
    } catch (error) {
      // console.log("SOME_THING_WRONG", error)
    }
  }
  return <View style={styles.container} />
}
export default Launching
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    flex: 1,
  },
})
