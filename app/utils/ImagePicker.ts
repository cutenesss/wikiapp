/* eslint-disable no-empty */
import { Keyboard, Linking, Platform } from "react-native"
import VersionCheck from "react-native-version-check"
import * as ImagePicker from "react-native-image-picker"

const hideKeyboard = () => Keyboard.dismiss()

async function openStore() {
  Linking.openURL(await VersionCheck.getStoreUrl())
}

// open gallery for image-picker library
const openGallery = (funcCallBack) => {
  const options: any = {
    storageOptions: {
      skipBackup: true,
      path: "images",
      img: [
        {
          url: "",
          freeHeight: true,
        },
      ],
    },
    quality: 0.1,
    mediaType: "photo",
  }
  ImagePicker.launchImageLibrary(options, (response) => {
    if (response?.didCancel) {
    } else if (response?.errorMessage) {
    } else {
      const itemImage = {
        uri: Platform.OS === "android" ? response?.uri : response?.uri?.replace("file://", ""),
        type: response?.type || "image/png",
        name: response?.fileName || response?.uri,
      }
      funcCallBack && funcCallBack(itemImage)
    }
  })
}

export default {
  hideKeyboard,
  openStore,
  openGallery,
}
