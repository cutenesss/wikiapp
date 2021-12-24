import { HEIGHT, WIDTH } from "@configs/functions"
import colors from "../assets/colors"

const themes = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 1.84,
  },
  shadowGray: {
    shadowColor: colors.colorDEE3E6,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 0.84,
  },
  hitSlop: {
    top: 25,
    left: 25,
    right: 25,
    bottom: 25,
  },
  empty: {
    backgroundColor: colors.whitef2,
    width: "100%",
    paddingHorizontal: WIDTH(16),
    paddingVertical: HEIGHT(20),
  },
}

export default themes
