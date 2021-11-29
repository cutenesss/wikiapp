import React from "react"
import { Text, View, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { getLineHeight, getFont } from "../../configs/functions"
import { translate } from "../../i18n"
import R from "../../assets/R"

type Props = {
  customStyle?: ViewStyle
  content?: string
  customTextStyle?: TextStyle
}

const ItemTrong = (props: Props) => {
  const { customStyle, content, customTextStyle } = props
  return (
    <View style={[styles.container, customStyle]}>
      <Text style={[styles.text, customTextStyle]}>{content || translate("TRONG")}</Text>
    </View>
  )
}
export default ItemTrong
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  text: {
    color: R.colors.gray6,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(20),
    textAlign: "center",
  },
})
