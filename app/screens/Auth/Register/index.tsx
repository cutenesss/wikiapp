import React, { useState, useEffect, useRef } from "react"
import { View, ImageBackground, FlatList, Text } from "react-native"
import DeviceInfo from "react-native-device-info"
import axios from "axios"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

import { register } from "@apis/functions/user"
import { rootServerInstance } from "@apis/helpers"
import STATUS from "@apis/status"
import { handleErrorApiWithStatusCode } from "@apis/handleError"
import { IResponseLogin } from "@types"

import { INPUT_TYPE } from "@configs/constant"
import { popupOk, validateEmail, validatePhone } from "@configs/functions"
import R from "@assets/R"
import AsyncStorageUtils from "@utils/AsyncStorageUtils"
import { translate } from "@i18n"

import LoadingComponent from "@common/Loading/LoadingComponent"
import BaseButton from "@components/Buttons/BaseButton"
import TextInputIcon from "@components/Input/TextInputIcon"
import HeaderBack from "@components/Headers/HeaderBack"

import { goBack, navigate, reset } from "@navigation/navigation-service"
import ScreenName from "@navigation/screen-name"
import styles from "../Login/styles"
import ProfileImage from "@components/Item/ProfileImage"
import ItemPickerArea from "./Item/ItemPickerArea"

const DATA_LOGIN = [
  {
    title: "Họ và tên",
    label: "Họ và tên",
    type: INPUT_TYPE.TEXT_INPUT,
  },
  {
    title: "Email",
    label: "Email",
    type: INPUT_TYPE.TEXT_INPUT,
  },
  {
    title: "Số điện thoại",
    label: "Số điện thoại",
    type: INPUT_TYPE.TEXT_INPUT,
  },
  {
    title: "Mật khẩu",
    label: "Mật khẩu",
    isPassword: true,
    type: INPUT_TYPE.TEXT_INPUT,
  },
]

const Register = () => {
  const content = useRef({
    user_name: "",
    email: "",
    phone: "",
    user_password: "",
    imageObject: undefined,
    address: {
      province_id: "",
      tenTinh: "",
      district_id: "",
      tenQuanHuyen: "",
      village_id: "",
      tenPhuongXa: "",
    },
  })

  const [loading, setLoading] = useState(false)

  const _onChangeValue = (value: any, index: number) => {
    switch (index) {
      case 0: {
        content.current.user_name = value
        break
      }
      case 1: {
        content.current.email = value
        break
      }
      case 2: {
        content.current.phone = value
        break
      }
      case 3: {
        content.current.user_password = value
        break
      }
      case -1: {
        content.current.imageObject = value
        break
      }
      case -2: {
        content.current.address = value
        break
      }
      default:
        break
    }
  }

  const validateInput = () => {
    console.log("ssssssss", content.current)
    if (
      content.current.email === "" ||
      content.current.user_name === "" ||
      content.current.user_password === ""
    ) {
      popupOk(translate("notice_t"), translate("null_form"))
    } else if (!validateEmail(content.current.email)) {
      popupOk(translate("notice_t"), translate("email_format_invalid"))
    } else if (!validatePhone(content.current.phone)) {
      popupOk(translate("notice_t"), translate("phone_format_invalid"))
    } else if (content.current.address.district_id === "") {
      popupOk(translate("notice_t"), translate("CHUA_CHON_QUAN_HUYEN"))
    } else if (content.current.address.province_id === "") {
      popupOk(translate("notice_t"), translate("CHUA_CHON_THANH_PHO"))
    } else if (content.current.address.village_id === "") {
      popupOk(translate("notice_t"), translate("CHUA_CHON_PHUONG_XA"))
    } else {
      // onRegister()
    }
  }

  const onRegister = async () => {
    setLoading(true)
    try {
      const body = {
        user_name: content.current.user_name,
        email: content.current.email,
        mobile: content.current.phone,
        user_password: content.current.user_password,
        district_id: content.current.address.district_id,
        province_id: content.current.address.province_id,
        village_id: content.current.address.village_id,
      }
      const res = await register(body)
      if (res?.code === STATUS.SUCCESS) {
        popupOk(translate("notice_t"), translate("register_success"), () => goBack())
      } else throw new Error(JSON.stringify(res))
      setLoading(false)
    } catch (error) {
      // console.log("error", error)
      setLoading(false)
      popupOk(translate("notice_t"), translate("something_wentwrong"))
    }
  }

  const Footer = ({ onChangeValue, defaultValue }) => (
    <View style={styles.footer}>
      <ItemPickerArea defaultValue={defaultValue} onChangeValue={onChangeValue} />
      <BaseButton
        customStyleBtn={styles.button}
        title={translate("TAO_TAI_KHOAN")}
        onPress={validateInput}
      />
      <Text style={styles.textFooter} onPress={() => navigate(ScreenName.Login)}>
        {translate("DA_CO_TK")}
      </Text>
    </View>
  )

  const getDefaultValue = (index: number) => {
    switch (index) {
      case 0:
        return content.current.user_name
      case 1:
        return content.current.email
      case 2:
        return content.current.phone
      case 3:
        return content.current.user_password
      default:
        return ""
    }
  }

  return (
    <ImageBackground
      source={R.images.backgroundLogin}
      style={styles.container}
      resizeMode="stretch"
    >
      <HeaderBack
        backgroundColorStatusBar={R.colors.transparent}
        title={translate("DANG_KI_TAI_KHOAN")}
        containerStyles={styles.headerStyle}
        titleStyle={styles.titleHeaderStyle}
      />
      <FlatList
        ListHeaderComponent={
          <ProfileImage
            containerStyle={styles.img}
            onImageChange={(value) => _onChangeValue(value, -1)}
          />
        }
        style={styles.list}
        data={DATA_LOGIN}
        renderItem={({ item, index }) => {
          return (
            <TextInputIcon
              title={item.title}
              placeholder={item.label}
              defaultValue={getDefaultValue(index)}
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
        ListFooterComponent={
          <Footer
            onChangeValue={(value) => _onChangeValue(value, -2)}
            defaultValue={content.current.address}
          />
        }
      />
      <LoadingComponent isLoading={loading} />
    </ImageBackground>
  )
}

export default Register
