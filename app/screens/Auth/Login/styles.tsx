import { StyleSheet } from "react-native"
import R from "@assets/R"
import { getFont, getLineHeight, HEIGHT, WIDTH } from "@configs/functions"

export default StyleSheet.create({
  button: {
    marginBottom: HEIGHT(30),
    marginTop: HEIGHT(16),
  },
  container: {
    alignItems: "center",
    flex: 1,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: HEIGHT(24),
  },
  footer: {
    marginTop: HEIGHT(20),
    paddingHorizontal: WIDTH(16),
  },
  headerStyle: {
    backgroundColor: R.colors.transparent,
  },
  img: {
    alignSelf: "center",
    marginVertical: HEIGHT(24),
  },
  input: {
    backgroundColor: R.colors.transparent,
  },
  inputContainer: {
    backgroundColor: R.colors.transparent,
    marginTop: HEIGHT(8),
  },
  list: {
    backgroundColor: R.colors.transparent,
    flexGrow: 0,
  },
  logo: {
    alignSelf: "center",
    height: WIDTH(110),
    marginBottom: HEIGHT(40),
    marginTop: HEIGHT(50),
    width: WIDTH(110),
  },
  textFooter: {
    alignSelf: "center",
    color: R.colors.white,
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
  titleHeaderStyle: {
    color: R.colors.white,
  },
})
