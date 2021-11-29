import * as React from "react"
import Svg, { Path, Mask, G, ClipPath, Defs, Circle } from "react-native-svg"
import { translate } from "@i18n"
import R from "@assets/R"
import { HEIGHT, WIDTH } from "@configs/functions"

type Props = {
  iconName: string
  color?: string
  width?: number
  height?: number
}

const IconSVG: React.FC<Props> = (props: Props) => {
  const { iconName, color, width, height } = props
  switch (iconName) {
    default:
      return (
        <Svg width={width ?? WIDTH(20)} height={height ?? WIDTH(20)} viewBox="0 0 80 80">
          <Path
            fill={color ?? R.colors.blue130}
            d="M19.2 9c-6.8 4.2-7.2 6-7.2 30.3s.5 26.8 6.4 31c2.9 2 4.3 2.2 21.1 2.5 16.6.2 18.3.1 21.3-1.8 6.4-4 7.2-6.6 7.2-24.8V30h-7.1c-7.3 0-12.1-1.7-13.6-4.9-.4-.9-.9-5.2-1.2-9.6l-.6-8L34 7.2C24 7 22.1 7.2 19.2 9zm24.1 25.2c1 3-.6 3.8-7.8 3.8-7.4 0-9.2-.8-8.1-3.5.7-2 15.2-2.2 15.9-.3zm5.5 15.7c.8.5 1.2 1.7 1 2.7-.3 1.7-1.5 1.9-10.9 2.2-9.4.2-10.7.1-11.3-1.5-1.2-3.1 2.1-4.3 11.3-4.3 4.7 0 9.2.4 9.9.9z"
          />
          <Path
            fill={color ?? R.colors.blue130}
            d="M51 14.9c0 6.1.3 7.2 2.2 8.5 2.3 1.7 12.3 2.3 13.2.8C66.9 23.3 53.3 8 51.9 8c-.5 0-.9 3.1-.9 6.9z"
          />
        </Svg>
      )
  }
}

export default IconSVG
