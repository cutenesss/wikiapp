import { StyleSheet } from "react-native"

import R from "@assets/R"
import { getFont, WIDTH, HEIGHT, getLineHeight } from "@configs/functions"

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.white,
    flex: 1,
  },
  doing: {
    alignSelf: "center",
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
    marginTop: HEIGHT(40),
  },
  indicatorStyle: {
    backgroundColor: R.colors.primary,
    height: HEIGHT(5),
  },
  labelStyle: {
    textTransform: "uppercase",
  },
  tabBar: {
    backgroundColor: R.colors.black3,
    borderTopColor: R.colors.black3,
    borderTopWidth: WIDTH(1),
    overflow: "hidden",
  },
})

export default styles
