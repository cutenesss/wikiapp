import React, { useRef, useEffect } from "react"
import { Animated, ViewProps } from "react-native"

type Props = {
  children: ViewProps
  funcCallBack: () => void
}

const BubbleAnimated: React.FunctionComponent<Props> = (props: Props) => {
  const { children, funcCallBack } = props

  const opacity = useRef(new Animated.Value(0))
  const appearingAnim = useRef(
    Animated.timing(opacity.current, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }),
  )
  const disappearingAnim = useRef(
    Animated.timing(opacity.current, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }),
  )

  useEffect(() => {
    appearingAnim.current.start(() => {
      disappearingAnim.current.start(({ finished }) => {
        if (finished) {
          funcCallBack && funcCallBack()
        }
      })
    })
    return () => {
      appearingAnim.current.stop()
      disappearingAnim.current.stop()
    }
  }, [])

  return <Animated.View style={{ opacity: opacity.current }}>{children}</Animated.View>
}

export default BubbleAnimated
