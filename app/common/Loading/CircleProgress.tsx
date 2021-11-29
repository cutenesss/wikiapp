import * as React from "react"
import { TextInput, Animated, View, StyleSheet } from "react-native"
import Svg, { G, Circle } from "react-native-svg"
import R from "@assets/R"
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

type Props = {
  percentage?: number
  radius?: number
  strokeWidth?: number
  childrenView?: JSX.Element
}

export default function CircleProgress({
  percentage = 35,
  radius = 40,
  strokeWidth = 10,
  childrenView,
}: Props) {
  const circumference = 2 * Math.PI * radius
  const halfCircle = radius + strokeWidth

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="270" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={R.colors.primary}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={(circumference * Math.min(percentage, 100)) / 100 - circumference}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={R.colors.black0}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
        {childrenView && childrenView}
      </Svg>
    </View>
  )
}
