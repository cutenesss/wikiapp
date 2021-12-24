import React from "react"
import { StyleSheet, TouchableOpacity, View, StyleProp, ViewStyle, TextStyle } from "react-native"
import { Text } from "@ui-kitten/components"
import Icon from "react-native-vector-icons/AntDesign"

import R from "@assets/R"
import { getWidth, HEIGHT, WIDTH } from "@configs/functions"
import { goBack } from "@navigation/navigation-service"

import CustomStatusBar from "@common/CustomStatusBar"

interface ItemProps {
  title: string
  childrenRight?: any
  onButton?: () => void
  containerStyles?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  backgroundColorStatusBar?: string
  blackBarStyle?: boolean
  isStatusBarAndroidVisible?: boolean
}
const HeaderBack = ({
  title,
  childrenRight,
  onButton,
  containerStyles,
  titleStyle,
  blackBarStyle,
  backgroundColorStatusBar,
  isStatusBarAndroidVisible,
}: ItemProps) => {
  return (
    <View>
      <CustomStatusBar
        backgroundColor={backgroundColorStatusBar}
        blackBarStyle={blackBarStyle}
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
        <View style={styles.viewTxt}>
          <Text numberOfLines={2} category={"p1"} style={[styles.title, titleStyle]}>
            {title}
          </Text>
        </View>
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
    backgroundColor: R.colors.black3,
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
    color: R.colors.white,
    fontWeight: "700",
    textAlign: "center",
  },
  viewTxt: {
    left: getWidth() / 2 - WIDTH(120),
    position: "absolute",
    width: WIDTH(250),
  },
})
