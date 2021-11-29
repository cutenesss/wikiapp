/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react"
import { View, StyleSheet, ImageSourcePropType } from "react-native"
import FastImage from "react-native-fast-image"
import R from "@assets/R"
import { WIDTH } from "@configs/functions"
import { TouchableOpacity } from "react-native-gesture-handler"
import { ImagePickerResponse, launchImageLibrary } from "react-native-image-picker"
import { shallowEqual, useSelector } from "react-redux"
type Props = {
  avartar?: ImageSourcePropType
  onImageChange?: (resimage: ImagePickerResponse) => void
  hideButtonPicker?: boolean
  containerStyle?: any
  isAdmin?: boolean
}

const ProfileImage: React.FC<Props> = (props: Props) => {
  const userInfo = useSelector((state: any) => state.userReducers, shallowEqual)
  const { onImageChange, hideButtonPicker, isAdmin, avartar } = props
  const [imageUri, setImageUri] = useState<string>()

  useEffect(() => {
    if (!isAdmin) {
      setImageUri(userInfo?.avatar)
    }
  }, [userInfo])

  const onPickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, async (res) => {
      if (res.uri && res.fileName) {
        onImageChange?.(res)
        setImageUri(res.uri)
      }
    })
  }

  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
      {!hideButtonPicker && (
        <View style={styles.button}>
          <TouchableOpacity style={styles.viewChooseImage} onPress={onPickImage}>
            {/* <FastImage
              source={R.images.icCamera}
              style={{ width: WIDTH(18), height: WIDTH(18) }}
              resizeMode="stretch"
            /> */}
          </TouchableOpacity>
        </View>
      )}
      {/* <FastImage source={imageAva} style={styles.image} /> */}
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
  viewChooseImage: {
    alignItems: "center",
    height: WIDTH(36),
    justifyContent: "center",
    width: WIDTH(36),
  },
})
