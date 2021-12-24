import React from "react"
import { View, StyleSheet, TouchableOpacity, Text as RNText } from "react-native"
import { Text } from "@ui-kitten/components"
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu"

import R from "@assets/R"

import CustomStatusBar from "@common/CustomStatusBar"

import { getFont, getLineHeight, getWidth, HEIGHT, WIDTH } from "@configs/functions"
import { translate } from "@i18n"
import { navigate } from "@navigation/navigation-service"
import ScreenName from "@navigation/screen-name"

interface Props {
  onPressUD: () => void
}

const HeaderHome = (props: Props) => {
  const { onPressUD } = props
  return (
    <View style={styles.container}>
      <CustomStatusBar barStyle="light-content" backgroundColor={R.colors.transparent} />
      <View style={styles.contentView}>
        <Text category="h4" style={styles.txt}>
          {translate("APP_NAME")}
        </Text>
        <ViewFunction onPressUD={onPressUD} />
      </View>
    </View>
  )
}

const ViewFunction = ({ onPressUD }) => {
  const onLightPress = () => {
    navigate(ScreenName.MapEvent)
  }

  const onPressHD = () => {
    navigate(ScreenName.AppInstruction)
  }

  const onPressKPI = () => {
    navigate(ScreenName.KPIStatus)
  }

  return (
    <View style={styles.viewRight}>
      <TouchableOpacity style={styles.viewBulb} onPress={onLightPress}>
        <Entypo size={WIDTH(25)} name="location-pin" color={R.colors.primary} />
      </TouchableOpacity>
      <Menu>
        <MenuTrigger>
          <Ionicons size={WIDTH(25)} name="settings-outline" color={R.colors.primary} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={onPressHD}>
            <RNText style={styles.txtMenu}>{translate("HUONG_DAN")}</RNText>
          </MenuOption>
          <MenuOption onSelect={onPressUD}>
            <RNText style={styles.txtMenu}>{translate("THONG_TIN_UNG_DUNG")}</RNText>
          </MenuOption>
          <MenuOption onSelect={onPressKPI}>
            <RNText style={styles.txtMenu}>{translate("CHI_SO_KPI")}</RNText>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  )
}

export default HeaderHome
const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.black3,
  },
  contentView: {
    alignItems: "center",
    backgroundColor: R.colors.black3,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(12),
    paddingVertical: HEIGHT(8),
    width: getWidth(),
  },
  txt: {
    color: R.colors.white,
    fontWeight: "bold",
  },
  txtMenu: {
    color: R.colors.black0,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
  },
  viewBulb: {
    marginRight: WIDTH(12),
  },
  viewRight: {
    alignItems: "center",
    flexDirection: "row",
  },
})
