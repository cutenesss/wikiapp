import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"
import R from "@assets/R"
import { getFont, getLineHeight, WIDTH } from "@configs/functions"
import { navigate } from "@navigation/navigation-service"
type Props = {
  onPress?: () => void
  numberNoftif?: number
}

const NotificationCounter: React.FC<Props> = (props: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigate("NotificationView")}>
      {props.numberNoftif > 0 && (
        <View style={styles.iconNumber}>
          <Text style={styles.text}>{props.numberNoftif}</Text>
        </View>
      )}
      {/* <FastImage
        source={R.images.notification}
        style={{ width: WIDTH(20), height: WIDTH(20) }}
        resizeMode="contain"
      /> */}
    </TouchableOpacity>
  )
}

export default NotificationCounter

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(35),
    height: WIDTH(35),
    justifyContent: "center",
    width: WIDTH(35),
  },
  iconNumber: {
    alignItems: "center",
    backgroundColor: R.colors.primary,
    borderRadius: WIDTH(15),
    height: WIDTH(15),
    justifyContent: "center",
    position: "absolute",
    right: -WIDTH(3),
    top: -WIDTH(3),
    width: WIDTH(15),
    zIndex: 1,
  },
  text: {
    color: R.colors.white,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(11.5),
    lineHeight: getLineHeight(16),
  },
})
