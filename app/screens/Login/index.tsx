import React, { useState, useEffect, useRef } from "react"
import { View, Image, FlatList, Text } from "react-native"
import DeviceInfo from "react-native-device-info"
import axios from "axios"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { login } from "@apis/functions/user"
import { rootServerInstance } from "@apis/helpers"
import STATUS from "@apis/status"
import { handleErrorApiWithStatusCode } from "@apis/handleError"
import { IResponseLogin } from "@types"

import { INPUT_TYPE } from "@configs/constant"
import { popupOk, WIDTH } from "@configs/functions"
import R from "@assets/R"
import AsyncStorageUtils from "@utils/AsyncStorageUtils"
import { translate } from "@i18n"

import LoadingComponent from "@common/Loading/LoadingComponent"
import BaseButton from "@components/Buttons/BaseButton"
import TextInputIcon from "@components/Input/TextInputIcon"
import CustomStatusBar from "@common/CustomStatusBar"

import { navigate, reset } from "@navigation/navigation-service"
import ScreenName from "@navigation/screen-name"
import styles from "./styles"

const DATA_LOGIN = [
  {
    label: "Tài khoản",
    icon: <Icon size={WIDTH(20)} name={"account"} color={R.colors.primary} />,
    type: INPUT_TYPE.TEXT_INPUT,
  },
  {
    label: "Mật khẩu",
    icon: <Icon size={WIDTH(20)} name={"lock"} color={R.colors.primary} />,
    isPassword: true,
    type: INPUT_TYPE.TEXT_INPUT,
  },
]

const Login = () => {
  const email = useRef<string>("")
  const password = useRef<string>("")
  const [loading, setLoading] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [isAlert, setIsAlert] = useState(0)

  useEffect(() => {
    checkLocalStorageAccount()
  }, [])

  const checkLocalStorageAccount = async () => {
    setLoading(true)
    try {
      const username = await AsyncStorageUtils.getObject(AsyncStorageUtils.KEY.USERNAME)
      const pass = await AsyncStorageUtils.getObject(AsyncStorageUtils.KEY.PASSWORD)
      if (username) email.current = username
      if (pass) password.current = pass
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const _onChangeValue = (value: string, index: number) => {
    switch (index) {
      case 0: {
        email.current = value
        break
      }
      case 1: {
        password.current = value
        break
      }
      default:
        break
    }
  }

  const validateInput = () => {
    if (password.current.trim() === "") {
      setIsAlert(1)
      setAlertText(translate("null_form"))
    } else {
      setIsAlert(0)
      setAlertText("")
      onLogin()
    }
  }

  const onLogin = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId()
      const tokenOneSignal = await AsyncStorageUtils.get(AsyncStorageUtils.KEY.SAVE_TOKEN_NOTI)
      setLoading(true)
      const bodyLogin = {
        username: email.current,
        password: password.current,
        deviceId: deviceId,
        oneSignalId: tokenOneSignal,
      }
      const resLogin = await login(bodyLogin)
      if (resLogin.status === STATUS.CREATED) {
        // tim role dau tien co accessToken de log out
        const firstToken = resLogin.data.data?.find(
          (itemRole: IResponseLogin) => itemRole?.accessToken !== "",
        )
        rootServerInstance.setHeader("Authorization", `Bearer ${firstToken?.accessToken}`)
        axios.defaults.headers.common.Authorization = `Bearer ${firstToken?.accessToken}`
        await AsyncStorageUtils.remove(AsyncStorageUtils.KEY.USERNAME)
        await AsyncStorageUtils.saveObject(AsyncStorageUtils.KEY.USER_DATA, resLogin.data.data)
        await AsyncStorageUtils.saveObject(
          AsyncStorageUtils.KEY.CURRENT_TOKEN,
          firstToken.accessToken,
        )
        await AsyncStorageUtils.saveObject(AsyncStorageUtils.KEY.USERNAME, email.current)
        reset(ScreenName.Home)
      } else {
        handleErrorApiWithStatusCode(resLogin?.data?.errorCode)
      }
      setLoading(false)
    } catch (error) {
      // console.log("error", error)
      setLoading(false)
      popupOk(translate("notice_t"), translate("something_wentwrong"))
    }
  }

  const Footer = () => (
    <View style={styles.footer}>
      <BaseButton
        customStyleBtn={styles.button}
        title={translate("DANG_NHAP")}
        onPress={validateInput}
      />
      <Text style={styles.textFooter}>{translate("DANG_KI_TK")}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <CustomStatusBar />
      <FlatList
        ListHeaderComponent={
          <Image style={styles.logo} source={R.images.logoApp} resizeMode="contain" />
        }
        style={styles.flatlist}
        data={DATA_LOGIN}
        renderItem={({ item, index }) => {
          let defaultValue = email.current
          if (index === 1) defaultValue = password.current
          return (
            <TextInputIcon
              icon={item.icon}
              placeholder={item.label}
              defaultValue={defaultValue}
              onChangeValue={(value) => _onChangeValue(value, index)}
              isPassword={item.isPassword}
              type={item.type}
              isAlert={isAlert}
              index={index}
              textAlert={alertText}
            />
          )
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        keyExtractor={(item, index) => String(index)}
        ListFooterComponent={<Footer />}
      />
      <LoadingComponent isLoading={loading} />
    </View>
  )
}
export default Login
