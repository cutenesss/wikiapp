import React, { FunctionComponent } from "react"
import { Text, View, StyleSheet } from "react-native"
import Svg, { Circle } from "react-native-svg"

// config
import { getFont, getLineHeight, WIDTH } from "@configs/functions"
import R from "@assets/R"

type Props = {
  progressValue: number | string
  width?: number
  height?: number
  strokeWidth?: number
  fillLayout?: string
  fillColor?: string
  hideProgress?: boolean
  customRadius?: number
}

const ProgressText = ({ visible, progressValue }) => {
  if (visible) {
    return <Text style={styles.progress}>{`${progressValue ?? 0}%`}</Text>
  }
  return null
}

const CircleProgress: FunctionComponent<Props> = (props: Props) => {
  const {
    progressValue,
    width,
    height,
    strokeWidth,
    fillColor,
    fillLayout,
    hideProgress,
    customRadius,
  } = props
  const radius = customRadius || 20
  const C = 2 * Math.PI * radius
  const alpha = (Number(progressValue) * 360) / 100
  const progress = (Math.PI * radius * alpha) / 180
  const strokeDashoffset = C / 4
  return (
    <View style={[styles.container, width && { width }, height && { height }]}>
      <Svg
        width={width || WIDTH(40)}
        height={height || WIDTH(40)}
        viewBox="0 0 42 42"
        style={styles.layout}
      >
        <Circle
          cx={21}
          cy={21}
          r={radius}
          strokeWidth={strokeWidth || 2}
          stroke={fillLayout || R.colors.blueEFF0FA}
        />
      </Svg>
      <Svg
        width={width || WIDTH(40)}
        height={height || WIDTH(40)}
        viewBox="0 0 42 42"
        style={styles.circle}
      >
        <Circle
          cx={21}
          cy={21}
          r={radius}
          stroke={fillColor || R.colors.blue2E3192}
          strokeWidth={strokeWidth || 2}
          strokeDasharray={`${progress} ${C - progress}`}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <ProgressText visible={!hideProgress} progressValue={progressValue} />
    </View>
  )
}

export default CircleProgress

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
    transform: [{ rotateY: "180deg" }],
  },
  container: {
    alignItems: "center",
    height: WIDTH(40),
    justifyContent: "center",
    width: WIDTH(40),
  },
  layout: {
    position: "absolute",
  },
  progress: {
    color: R.colors.blue2E3192,
    fontFamily: R.fonts.Roboto,
    fontSize: getFont(12),
    lineHeight: getLineHeight(18),
  },
})
