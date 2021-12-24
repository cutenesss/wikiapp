import { StyleSheet } from "react-native"
import R from "@assets/R"
import { HEIGHT, WIDTH } from "@configs/functions"

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.whiteF2,
    flex: 1,
  },
  textInput: {
    alignSelf: "center",
    height: HEIGHT(600),
    width: WIDTH(343),
  },
})

export default styles
