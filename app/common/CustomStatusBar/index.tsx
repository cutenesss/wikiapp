import React from "react"
import { StatusBar, View } from "react-native"
import { getStatusBarHeight } from "react-native-status-bar-height"

import R from "../../assets/R"

type Props = {
  backgroundColor?: string
  barStyle?: any
  isStatusBarAndroidVisible?: boolean
}

const CustomStatusBar: React.FC<Props> = (props: Props) => {
  const { isStatusBarAndroidVisible, backgroundColor, barStyle } = props
  const color = backgroundColor || R.colors.white
  const bar = barStyle || "dark-content"
  const height = getStatusBarHeight(isStatusBarAndroidVisible)

  return (
    <View style={{ height, backgroundColor: color }}>
      <StatusBar
        networkActivityIndicatorVisible={true}
        translucent
        backgroundColor={color}
        barStyle={bar}
      />
    </View>
  )
}

export default CustomStatusBar
