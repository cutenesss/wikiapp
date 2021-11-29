import { StyleSheet } from "react-native"
import R from "../../../assets/R"
import { WIDTH, HEIGHT } from "../../../configs/functions"
const styles = StyleSheet.create({
  bottomButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: HEIGHT(8),
    marginTop: HEIGHT(25),
    width: WIDTH(220),
  },
  container: {
    backgroundColor: R.colors.black50p,
  },
  content: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(5),
    width: WIDTH(260),
  },
  header: {
    alignItems: "center",
    padding: HEIGHT(5),
  },
  leftButton: {
    backgroundColor: R.colors.gray8B,
    borderWidth: 0,
    minWidth: WIDTH(80),
  },
  rightButton: {
    minWidth: WIDTH(80),
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: HEIGHT(3),
  },
  txcontent: {
    fontSize: 14,
    textAlign: "center",
  },
})

export default styles
