import React, { useState, useEffect, useRef } from "react"
import { View, Image, Text, ImageBackground } from "react-native"
import { List } from "@ui-kitten/components"
import auth from "@react-native-firebase/auth"
import { useSelector } from "@redux/reducers"
import { useDispatch } from "react-redux"
import * as Keychain from "react-native-keychain"

import { login } from "@apis/functions/user"
import STATUS from "@apis/status"
import { handleErrorApiWithStatusCode } from "@apis/handleError"
import { updateDirectlyInitStateAction } from "@redux/actions/getInitState"

import { INPUT_TYPE } from "@configs/constant"
import { popupOk } from "@configs/functions"
import R from "@assets/R"
import { translate } from "@i18n"

import LoadingComponent from "@common/Loading/LoadingComponent"
import BaseButton from "@components/Buttons/BaseButton"
import HeaderBack from "@components/Headers/HeaderBack"
import TextInputIcon from "@components/Input/TextInputIcon"

import { navigate, reset } from "@navigation/navigation-service"
import ScreenName from "@navigation/screen-name"
import styles from "./styles"

const DATA_LOGIN = [
  {
    label: "Tài khoản",
    title: "Tài khoản",
    type: INPUT_TYPE.TEXT_INPUT,
  },
  {
    label: "Mật khẩu",
    title: "Mật khẩu",
    isPassword: true,
    type: INPUT_TYPE.TEXT_INPUT,
  },
]

const Login = () => {
  const dispatch = useDispatch()
  const email = useRef<string>("")
  const password = useRef<string>("")
  const [loading, setLoading] = useState(false)

  const { initState } = useSelector((state) => state.initStateReducers)

  useEffect(() => {
    checkLocalStorageAccount()
  }, [])

  const checkLocalStorageAccount = async () => {
    setLoading(true)
    try {
      const credentials = await Keychain.getGenericPassword()
      if (credentials) email.current = credentials.username
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
    if (password.current.trim() === "" || email.current.trim() === "") {
      popupOk(translate("notice_t"), translate("null_form"))
    } else {
      onLogin()
    }
  }

  const onLogin = async () => {
    try {
      const user = auth().currentUser
      console.log("user", user)
      const token = await user.getIdToken()
      setLoading(true)
      const bodyLogin = {
        user_name: email.current,
        user_password: password.current,
        token_id: token,
        session_id: initState?.session_id,
      }
      console.log("bodyLogin", bodyLogin)
      const res = await login(bodyLogin)
      console.log("res", res)
      if (res?.code === STATUS.SUCCESS) {
        const stateBody = {
          session_id: res?.session_id,
          resident_id: res?.resident_id,
          is_login: 1,
          code: STATUS.SUCCESS,
        }
        dispatch(updateDirectlyInitStateAction(stateBody))
        await Keychain.setGenericPassword(email.current, "1")
        reset(ScreenName.Home)
      } else throw new Error(JSON.stringify(res))
      setLoading(false)
    } catch (error) {
      console.log("asaasa", error)
      setLoading(false)
      handleErrorApiWithStatusCode(JSON.parse(error?.message)?.description)
    }
  }

  const Footer = () => (
    <View style={styles.footer}>
      <BaseButton
        customStyleBtn={styles.button}
        title={translate("DANG_NHAP")}
        onPress={validateInput}
      />
      <Text style={styles.textFooter} onPress={() => navigate(ScreenName.Register)}>
        {translate("DANG_KI_TK")}
      </Text>
    </View>
  )

  return (
    <ImageBackground
      source={R.images.backgroundLogin}
      style={styles.container}
      resizeMode="stretch"
    >
      <HeaderBack
        backgroundColorStatusBar={R.colors.transparent}
        title={translate("DANG_NHAP")}
        containerStyles={styles.headerStyle}
        titleStyle={styles.titleHeaderStyle}
      />
      <List
        ListHeaderComponent={
          <Image style={styles.logo} source={R.images.logoSmartCity} resizeMode="contain" />
        }
        data={DATA_LOGIN}
        style={styles.list}
        renderItem={({ item, index }) => {
          let defaultValue = email.current
          if (index === 1) defaultValue = password.current
          return (
            <TextInputIcon
              title={item.title}
              placeholder={item.label}
              defaultValue={defaultValue}
              onChangeValue={(value) => _onChangeValue(value, index)}
              isPassword={item.isPassword}
              type={item.type}
              customContainerStyle={styles.inputContainer}
              customStyleTitle={styles.input}
              customStyleTxtTitle={styles.titleHeaderStyle}
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
    </ImageBackground>
  )
}
export default Login
