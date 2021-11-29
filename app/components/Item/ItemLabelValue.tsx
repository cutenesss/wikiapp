// @flow
import React from "react"
import { Text, StyleSheet, View, TouchableOpacity } from "react-native"

// config
import R from "@assets/R"
import { getLineHeight, getFont, WIDTH } from "@configs/functions"

type Props = {
  label: string
  value?: string
  color?: string
  onPress?: () => void
  isInvisible?: boolean
  styleTxt?: any
}

const ItemLabelValue = (props: Props) => {
  const { label, value, color, onPress, isInvisible, styleTxt } = props
  const backgroundColor = color || R.colors.gray0
  if (isInvisible) {
    return <View />
  } else {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.label}>{`${label}`}</Text>
        <TouchableOpacity activeOpacity={1} hitSlop={styles.hitSlop} onPress={onPress && onPress}>
          <Text style={[styles.extend, styleTxt]}>{value ? `${value}` : ""}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  extend: {
    color: R.colors.primary,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
  },
  hitSlop: {
    bottom: 15,
    left: 15,
    right: 15,
    top: 15,
  },
  label: {
    color: R.colors.black0,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(16),
    lineHeight: getLineHeight(24),
    marginRight: WIDTH(12),
  },
})
export default ItemLabelValue
