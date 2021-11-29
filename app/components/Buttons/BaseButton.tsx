import React, { FunctionComponent } from "react"
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"

// config
import R from "../../assets/R"
import { getFont, getLineHeight, HEIGHT, WIDTH } from "@configs/functions"

type Props = {
  title: string
  onPress?: (firstItem?: any, secondItem?: any) => void
  customStyleBtn?: StyleProp<ViewStyle>
  customStyleTitle?: StyleProp<TextStyle>
  disabled?: boolean
  isInvisible?: boolean
}

const BaseButton: FunctionComponent<Props> = (props: Props) => {
  const { isInvisible, title, onPress, customStyleBtn, customStyleTitle, disabled } = props
  const backgroundColor = disabled ? R.colors.gray5 : R.colors.primary
  if (isInvisible) return <View />
  else {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.container, { backgroundColor }, customStyleBtn]}
        activeOpacity={0.6}
        onPress={onPress && onPress}
      >
        <Text style={[styles.title, customStyleTitle]}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

export default BaseButton

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: R.colors.primary,
    borderRadius: WIDTH(10),
    justifyContent: "center",
    paddingVertical: HEIGHT(13),
    width: WIDTH(343),
  },
  title: {
    color: R.colors.white,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(18),
    lineHeight: getLineHeight(24),
  },
})
