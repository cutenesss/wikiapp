import React from "react"
import { View, Image, StyleSheet, ImageBackground, Platform, Text } from "react-native"
import { getStatusBarHeight } from "react-native-status-bar-height"

// config
import R from "@assets/R"
import { getWidth, HEIGHT, WIDTH, getLineHeight, getFont } from "@configs/functions"
import { translate } from "@i18n"

const HeaderHome = () => {
  const notchHeight = getStatusBarHeight(true)
  const topLogo = Platform.OS === "ios" ? notchHeight : HEIGHT(12)
  const topTitle = Platform.OS === "ios" ? notchHeight + HEIGHT(10) : HEIGHT(24)
  return (
    <ImageBackground style={styles.container} source={R.images.backgroundHeader} resizeMode="cover">
      <View style={[styles.viewLogo, { top: topLogo }]}>
        <Image source={R.images.logoApp} resizeMode="contain" style={styles.logo} />
      </View>
      <Text style={[styles.title, { top: topTitle }]}>{translate("APP_NAME")}</Text>
    </ImageBackground>
  )
}

export default HeaderHome

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.primary,
    flexDirection: "row",
    height: Platform.OS === "ios" ? HEIGHT(115) : HEIGHT(125),
    justifyContent: "center",
    marginBottom: -HEIGHT(44),
    width: getWidth(),
  },
  logo: {
    height: WIDTH(45),
    overflow: "hidden",
    width: WIDTH(45),
  },
  title: {
    color: R.colors.white,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    fontWeight: "bold",
    lineHeight: getLineHeight(24),
    position: "absolute",
  },
  viewLogo: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(45),
    height: WIDTH(45),
    justifyContent: "center",
    left: WIDTH(16),
    overflow: "hidden",
    position: "absolute",
    width: WIDTH(45),
  },
})
