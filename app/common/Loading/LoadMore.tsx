/* eslint-disable react-native/no-inline-styles */
import { getWidth, HEIGHT } from "@configs/functions"
import React from "react"

import { View, ActivityIndicator } from "react-native"
import R from "@assets/R"

type Props = {
  padding?: number
}

const LoadMore: React.FC<Props> = (props: Props) => {
  return (
    <View
      style={{
        padding: props.padding || HEIGHT(20),
        alignSelf: "center",
        alignItems: "center",
        width: getWidth(),
      }}
    >
      <ActivityIndicator size={"small"} color={R.colors.grey1000} />
    </View>
  )
}

export default LoadMore
