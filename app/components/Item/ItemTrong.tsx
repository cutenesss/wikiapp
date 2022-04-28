import React from "react"
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { Text } from "@ui-kitten/components"

import { translate } from "../../i18n"
import R from "../../assets/R"
import { HEIGHT } from "@configs/functions"

type Props = {
  customStyle?: ViewStyle
  content?: string
  customTextStyle?: TextStyle
}

const ItemTrong = (props: Props) => {
  const { customStyle, content, customTextStyle } = props
  return (
    <View style={[styles.container, customStyle]}>
      <Text category={"p1"} style={[styles.text, customTextStyle]}>
        {content || translate("TRONG")}
      </Text>
    </View>
  )
}
export default ItemTrong
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: R.colors.transparent,
    marginVertical: HEIGHT(12),
  },
  text: {
    textAlign: "center",
  },
})
