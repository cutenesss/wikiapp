/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import FastImage from "react-native-fast-image"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { ImagePickerResponse, launchImageLibrary } from "react-native-image-picker"
import { shallowEqual, useSelector } from "react-redux"

import R from "@assets/R"
import { WIDTH } from "@configs/functions"

type Props = {
  onImageChange?: (resimage: ImagePickerResponse) => void
  hideButtonPicker?: boolean
  containerStyle?: any
}

const ProfileImage: React.FC<Props> = (props: Props) => {
  const userInfo = useSelector((state: any) => state.userReducers, shallowEqual)
  const { onImageChange, hideButtonPicker } = props
  const [imageUri, setImageUri] = useState<string>()

  useEffect(() => {
    setImageUri(userInfo?.avatar)
  }, [userInfo])

  const onPickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, async (res) => {
      if (res.uri && res.fileName) {
        onImageChange?.(res)
        setImageUri(res.uri)
      }
    })
  }

  const imageAva = imageUri ? { uri: imageUri } : R.images.defaultAvatar

  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
      {!hideButtonPicker && (
        <TouchableOpacity style={styles.button} onPress={onPickImage}>
          <Icon size={WIDTH(20)} name="camera-plus" color={R.colors.primary} />
        </TouchableOpacity>
      )}
      <FastImage source={imageAva} style={styles.image} />
    </View>
  )
}

export default ProfileImage

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(36),
    bottom: -5,
    height: WIDTH(36),
    justifyContent: "center",
    position: "absolute",
    right: -5,
    width: WIDTH(36),
    zIndex: 1,
  },
  container: {
    backgroundColor: R.colors.white,
    borderRadius: WIDTH(88),
    height: WIDTH(88),
    width: WIDTH(88),
    ...R.themes.shadow,
  },
  image: {
    borderRadius: WIDTH(88),
    height: WIDTH(88),
    width: WIDTH(88),
  },
})
