import React from "react"
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from "react-native"
import { useSelector } from "@redux/reducers"
import { shallowEqual } from "react-redux"

// config
import R from "@assets/R"
import { translate } from "@i18n"
import { getFont, getLineHeight, HEIGHT, WIDTH } from "@configs/functions"

import { GENDER_TYPE } from "@configs/constant"
import { ESystemRoles } from "@types"

type Props = {
  width: Animated.AnimatedInterpolation
  borderRadius: Animated.AnimatedInterpolation
  paddingTop: Animated.AnimatedInterpolation
  onPress?: () => void
}

const ViewContainer = Animated.createAnimatedComponent(TouchableOpacity)

const Content = ({ content }) => {
  if (content !== "") {
    return <Text style={styles.maSv}>{content}</Text>
  }
  return null
}

const StudentInfor = ({ account }) => {
  const name = account?.profile?.fullname ?? translate("CHUA_CAP_NHAT")
  const content =
    account?.role?.systemRole === ESystemRoles.PhuHuynh
      ? account?.role?.child?.hoTen ?? translate("CHUA_CAP_NHAT")
      : account?.role?.organization?.tenDonVi ?? translate("CHUA_CAP_NHAT")
  const prefix =
    account?.role?.systemRole === ESystemRoles.PhuHuynh ? translate("CON") : translate("LOP")
  return (
    <View style={styles.viewInfor}>
      <Text style={styles.name}>{name}</Text>
      <Content content={`${prefix}: ${content}`} />
    </View>
  )
}

const InforLabel = (props: Props) => {
  const { userInfo } = useSelector((state: any) => state.userReducers, shallowEqual)

  const { width, borderRadius, paddingTop, onPress } = props

  let anhDaiDienDefault = R.images.maleAva

  switch (userInfo?.gioiTinh) {
    case GENDER_TYPE.FEMALE:
      anhDaiDienDefault = R.images.femaleAva
      break
    default:
      anhDaiDienDefault = R.images.maleAva
      break
  }
  const anhDaiDien = anhDaiDienDefault

  return (
    <ViewContainer
      style={[styles.container, { width, borderRadius, paddingTop }]}
      onPress={() => onPress && onPress()}
      activeOpacity={1}
    >
      <View style={styles.viewLeft}>
        <View style={styles.viewAva}>
          <Image style={styles.avatar} source={anhDaiDien} resizeMode="cover" />
        </View>
        <StudentInfor account={userInfo} />
      </View>
    </ViewContainer>
  )
}

export default InforLabel

const styles = StyleSheet.create({
  avatar: {
    borderRadius: WIDTH(56) / 2,
    height: WIDTH(56),
    marginBottom: HEIGHT(8),
    width: WIDTH(56),
  },
  container: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: R.colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: HEIGHT(14),
    paddingLeft: WIDTH(13),
    paddingRight: WIDTH(16),
    paddingVertical: HEIGHT(12),
    ...R.themes.shadow,
  },
  maSv: {
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(14),
    lineHeight: getLineHeight(20),
    marginTop: HEIGHT(3),
  },
  name: {
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(18),
    fontWeight: "bold",
    lineHeight: getLineHeight(28),
  },
  viewAva: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: WIDTH(8),
  },
  viewInfor: {
    width: WIDTH(230),
  },
  viewLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
})
