import { StyleSheet } from "react-native"
import { HEIGHT, WIDTH } from "@configs/functions"
import R from "@assets/R"

const styles = StyleSheet.create({
  center: { alignItems: "center" },
  container: {
    backgroundColor: R.colors.white,
    flex: 1,
  },
  justify: { justifyContent: "space-between" },
  listFunction: {
    alignSelf: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    flexGrow: 0,
    marginTop: HEIGHT(20),
    width: WIDTH(343),
  },
  listOverallInfo: {
    alignSelf: "center",
    flexGrow: 0,
    marginBottom: HEIGHT(24),
    marginTop: HEIGHT(20),
    width: WIDTH(343),
  },
  logout: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    justifyContent: "center",
    marginBottom: HEIGHT(17),
    marginTop: HEIGHT(16),
    width: WIDTH(343),
  },
  oneItem: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(8),
    marginBottom: HEIGHT(16),
    width: WIDTH(343),
    ...R.themes.shadow,
  },
})

export default styles
