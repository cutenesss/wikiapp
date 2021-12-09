import { StyleSheet } from "react-native"

import { WIDTH, HEIGHT, getFont, getLineHeight } from "@configs/functions"
import R from "@assets/R"

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    backgroundColor: R.colors.primary,
    borderRadius: WIDTH(12),
    justifyContent: "center",
    width: WIDTH(148),
  },
  btnCancel: {
    alignItems: "center",
    backgroundColor: R.colors.redAlert,
    borderRadius: WIDTH(12),
    justifyContent: "center",
    width: WIDTH(148),
  },
  content: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(12),
    paddingBottom: HEIGHT(30),
    width: WIDTH(343),
  },
  image: {
    alignSelf: "center",
    height: WIDTH(81),
    marginBottom: HEIGHT(24),
    marginTop: HEIGHT(32),
    width: WIDTH(81),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(20),
    width: WIDTH(343),
  },
  text: {
    color: R.colors.white,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(18),
    fontWeight: "bold",
    lineHeight: getLineHeight(24),
  },
  textContent: {
    alignSelf: "center",
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
    marginBottom: HEIGHT(30),
    marginTop: HEIGHT(8),
    textAlign: "center",
    width: WIDTH(311),
  },
  textHeader: {
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(20),
    fontWeight: "bold",
    lineHeight: getLineHeight(28),
    marginHorizontal: WIDTH(20),
    textAlign: "center",
  },
})

export default styles
