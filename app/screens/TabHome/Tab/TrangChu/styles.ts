import { StyleSheet } from "react-native"

// config
import R from "@assets/R"
import { getWidth, HEIGHT, WIDTH } from "@configs/functions"

const styles = StyleSheet.create({
  columnWrapperStyle: { justifyContent: "center" },
  container: {
    backgroundColor: R.colors.white,
    flex: 1,
  },
  headerListItemBlue: { marginBottom: HEIGHT(10) },
  justify: {
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(16),
  },
  listDefault: {
    flexGrow: 0,
    marginBottom: HEIGHT(16),
    width: getWidth(),
  },
  row: {
    flexDirection: "row",
    marginTop: HEIGHT(5),
  },
  styleLastItem: {
    alignSelf: "center",
    marginVertical: HEIGHT(12),
    width: WIDTH(343),
  },
  width: {
    width: WIDTH(20),
  },
})

export default styles
