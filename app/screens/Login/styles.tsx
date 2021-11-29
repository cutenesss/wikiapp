import { StyleSheet } from "react-native"
import R from "@assets/R"
import { getFont, getLineHeight, HEIGHT, WIDTH } from "@configs/functions"

export default StyleSheet.create({
  button: {
    marginBottom: HEIGHT(30),
  },
  container: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    flex: 1,
  },
  flatlist: {
    backgroundColor: R.colors.white,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: HEIGHT(24),
  },
  footer: {
    marginTop: HEIGHT(50),
    paddingHorizontal: WIDTH(16),
  },
  logo: {
    alignSelf: "center",
    height: WIDTH(142),
    marginBottom: HEIGHT(16),
    marginTop: HEIGHT(70),
    width: WIDTH(142),
  },
  textFooter: {
    alignSelf: "center",
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
  },
  textForgot: {
    color: R.colors.redAlert,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
    marginBottom: HEIGHT(24),
    marginTop: HEIGHT(12),
    textDecorationLine: "underline",
  },
  textLogin: {
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
  },
})
