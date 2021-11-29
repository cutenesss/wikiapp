import React from "react"
import { View, Image, StyleSheet, StyleProp, ViewStyle } from "react-native"
import R from "@assets/R"
import { WIDTH } from "@configs/functions"

type Props = {
  isLoading: boolean
  style?: StyleProp<ViewStyle>
}

const LoadingComponent = (props: Props) => {
  const { style, isLoading } = props
  if (!isLoading) return null
  return (
    <View style={[styles.loadingContainer, style]}>
      <Image source={R.images.loading} style={styles.loading} />
    </View>
  )
}

export default LoadingComponent

const styles = StyleSheet.create({
  loading: {
    height: WIDTH(50),
    width: WIDTH(50),
  },
  loadingContainer: {
    alignItems: "center",
    bottom: 0,
    elevation: 3,
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
})
