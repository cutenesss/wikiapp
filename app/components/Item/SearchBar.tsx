import React from "react"
import { StyleSheet, TextInput, View, ViewStyle } from "react-native"
import FastImage from "react-native-fast-image"
// config
import { translate } from "@i18n"
import R from "@assets/R"
import { getFont, HEIGHT, WIDTH } from "@configs/functions"

type Props = {
  value: string
  onChangeText: (arg: string) => void
  placeHolder?: string
  style?: ViewStyle
  rightIcon?: boolean
}

const SearchBar: React.FC<Props> = (props: Props) => {
  const { value, placeHolder, style, rightIcon, onChangeText } = props
  if (rightIcon) {
    return (
      <View style={[styles.searchContainer, style]}>
        <TextInput
          value={value}
          placeholder={placeHolder ?? translate("TIM_KIEM")}
          style={styles.textInput}
          onChangeText={onChangeText}
        />
        {/* <FastImage source={R.images.icSearch} style={styles.icSearch} /> */}
      </View>
    )
  }
  return (
    <View style={[styles.searchContainer, style]}>
      {/* <FastImage source={R.images.icSearch} style={styles.icSearch} /> */}
      <TextInput
        value={value}
        placeholder={placeHolder ?? translate("TIM_KIEM")}
        style={styles.textInput}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  icSearch: {
    height: WIDTH(18),
    width: WIDTH(18),
  },
  searchContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(12),
    flexDirection: "row",
    justifyContent: "flex-start",
    minHeight: HEIGHT(48),
    paddingHorizontal: WIDTH(12),
    width: WIDTH(343),
    ...R.themes.shadow,
  },
  textInput: {
    fontSize: getFont(16),
    marginLeft: WIDTH(12),
    paddingVertical: HEIGHT(12),
    width: WIDTH(283),
  },
})
