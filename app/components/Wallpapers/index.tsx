import React from "react"
import { Image } from "react-native"
import { presets } from "./Wallpapers.Presets"
import { WallpaperProps } from "./Wallpapers.Props"

const defaultImage = require("./bg.png")

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Wallpaper(props: WallpaperProps) {
  // grab the props
  const { preset = "stretch", style: styleOverride, backgroundImage } = props

  // assemble the style
  const presetToUse = presets[preset] || presets.stretch
  const style = { ...presetToUse, ...styleOverride }

  // figure out which image to use
  const source = backgroundImage || defaultImage

  return <Image source={source} style={style} />
}
