import React from "react"
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native"
import { Text } from "@ui-kitten/components"
import { useSelector } from "@redux/reducers"
import auth from "@react-native-firebase/auth"
import * as Keychain from "react-native-keychain"

import STATUS from "@apis/status"
import { logout } from "@apis/functions/user"

import { HEIGHT, WIDTH } from "@configs/functions"
import R from "@assets/R"
import { translate } from "@i18n"
import { navigate, reset } from "@navigation/navigation-service"
import ScreenName from "@navigation/screen-name"

interface Props {
  onPressPhone: () => void
}

const ViewWelcome = (props: Props) => {
  return (
    <ImageBackground
      source={R.images.backgroundWelcome}
      resizeMode="stretch"
      style={styles.container}
    >
      <ViewUser />
      <ViewContent onPressPhone={props?.onPressPhone} />
    </ImageBackground>
  )
}

const ViewUser = () => {
  const { initState } = useSelector((state) => state.initStateReducers)
  const onPress = () => {
    navigate(ScreenName.Login)
  }

  const logOut = async () => {
    const body = {
      session_id: initState?.session_id,
    }
    try {
      const res = await logout(body)
      if (res?.code === STATUS.SUCCESS) {
        auth()
          .signOut()
          .then(async () => {
            await Keychain.resetGenericPassword()
            reset(ScreenName.AppInstruction)
          })
      } else throw new Error(JSON.stringify(res))
    } catch (error) {}
  }

  return (
    <View style={styles.viewUser}>
      <TouchableOpacity style={styles.row} onPress={onPress}>
        <Image source={R.images.defaultAvatar} resizeMode="contain" style={styles.img} />
        <Text category="p1" style={styles.txtUser}>
          KHACH
        </Text>
      </TouchableOpacity>
      <Text category="p1" style={styles.txtUser} onPress={logOut}>
        {translate("DANG_XUAT")}
      </Text>
    </View>
  )
}

const ViewContent = ({ onPressPhone }) => {
  return (
    <View style={styles.viewContent}>
      <TouchableOpacity onPress={onPressPhone} style={styles.viewPhone}>
        <Image source={R.images.iconPhone} resizeMode="contain" style={styles.phone} />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.viewHeader}>
          <Text category="h4" style={styles.txtHeader}>
            {translate("CHINH_QUYEN")}
          </Text>
        </View>
        <View style={styles.viewTxtContent}>
          <Text category="p1" style={styles.txtContent}>
            {translate("KINH_CHAO_QUY_KHACH")}
          </Text>
        </View>
      </View>
    </View>
  )
}
export default ViewWelcome
const styles = StyleSheet.create({
  container: {
    height: HEIGHT(380),
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -WIDTH(45),
    width: WIDTH(280),
  },
  img: {
    height: WIDTH(30),
    width: WIDTH(30),
  },
  phone: {
    height: WIDTH(115),
    width: WIDTH(115),
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
  },
  txtContent: {
    color: R.colors.white,
    fontWeight: "bold",
  },
  txtHeader: {
    color: R.colors.black0,
    fontWeight: "bold",
  },
  txtUser: {
    color: R.colors.white,
    marginLeft: WIDTH(4),
  },
  viewContent: {
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: HEIGHT(32),
  },
  viewHeader: {
    backgroundColor: R.colors.primary,
    borderTopRightRadius: WIDTH(4),
    paddingLeft: WIDTH(60),
    paddingRight: WIDTH(8),
    paddingVertical: HEIGHT(12),
    width: "100%",
  },
  viewPhone: {
    zIndex: 10,
  },
  viewTxtContent: {
    backgroundColor: R.colors.black40p,
    borderBottomRightRadius: WIDTH(4),
    paddingHorizontal: WIDTH(60),
    paddingVertical: HEIGHT(6),
    width: "100%",
  },
  viewUser: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: HEIGHT(24),
    paddingHorizontal: WIDTH(24),
  },
})
