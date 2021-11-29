import React from "react"
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native"
import Icon from "react-native-vector-icons/AntDesign"

import R from "@assets/R"
import { getFont, getLineHeight, getWidth, HEIGHT, WIDTH } from "@configs/functions"
import { goBack } from "@navigation/navigation-service"

import CustomStatusBar from "@common/CustomStatusBar"

interface ItemProps {
  title: string
  childrenRight?: any
  onButton?: () => void
  containerStyles?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  backgroundColorStatusBar?: string
  barStyle?: string
  isStatusBarAndroidVisible?: boolean
}
const HeaderBack = ({
  title,
  childrenRight,
  onButton,
  containerStyles,
  titleStyle,
  barStyle,
  backgroundColorStatusBar,
  isStatusBarAndroidVisible,
}: ItemProps) => {
  return (
    <View>
      <CustomStatusBar
        backgroundColor={backgroundColorStatusBar}
        barStyle={barStyle}
        isStatusBarAndroidVisible={isStatusBarAndroidVisible}
      />
      <View style={[styles.container, containerStyles && containerStyles]}>
        <TouchableOpacity
          style={styles.btnBack}
          hitSlop={styles.hitSlop}
          onPress={onButton || goBack}
        >
          <Icon size={WIDTH(20)} name="arrowleft" color={R.colors.primary} />
        </TouchableOpacity>
        <Text numberOfLines={2} style={[styles.title, titleStyle]}>
          {title}
        </Text>
        <View style={styles.rightView}>{childrenRight}</View>
      </View>
    </View>
  )
}
export default HeaderBack

const styles = StyleSheet.create({
  btnBack: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(18),
    height: WIDTH(36),
    justifyContent: "center",
    width: WIDTH(36),
    ...R.themes.shadow,
  },
  container: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(12),
    width: getWidth(),
  },
  hitSlop: {
    bottom: 20,
    left: 20,
    right: 20,
    top: 20,
  },
  rightView: {
    minWidth: WIDTH(36),
  },
  title: {
    color: R.colors.gray9,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    fontWeight: "700",
    left: getWidth() / 2 - WIDTH(115),
    lineHeight: getLineHeight(24),
    position: "absolute",
    textAlign: "center",
    width: WIDTH(250),
  },
})
