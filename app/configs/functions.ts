import { Dimensions, Alert, Linking } from "react-native"
import { initialWindowMetrics } from "react-native-safe-area-context"
import InAppBrowser from "react-native-inappbrowser-reborn"
import { appStore } from "../stores/configureStore"

import { changeDialogConfirmContent, changeDialogContent } from "../redux/actions/dialogStateAction"
import { colors } from "@assets"

const { width, height } = Dimensions.get("window")
const { width: widthScreen, height: heightScreen } = Dimensions.get("screen")
const deviceHeight = height - (initialWindowMetrics?.insets.top ?? 0)
export const WIDTH = (w: number): number => width * (w / 375)
export const HEIGHT = (h: number): number => deviceHeight * (h / 812)
export const WIDTH_SCREEN = (w: number): number => widthScreen * (w / 375)
export const HEIGHT_SCREEN = (h: number): number => heightScreen * (h / 812)
export const getLineHeight = (f: number): number => f
export const getWidth = (): number => width
export const getHeight = (): number => height
export const getInsetVertical = (): number =>
  (initialWindowMetrics?.insets.top || 0) + (initialWindowMetrics?.insets.bottom || 0)

export const getFont = (f: number): number => {
  return RFValue(f)
}

export function RFPercentage(percent: number) {
  const heightPercent = (percent * (deviceHeight ?? 0)) / 100
  return Math.round(heightPercent)
}

export function RFValue(fontSize: number) {
  const heightPercent =
    (((initialWindowMetrics?.insets.top ?? 0) > 20 ? fontSize : fontSize - 1) *
      (deviceHeight ?? 0)) /
    getHeight()
  return Math.round(heightPercent)
}

export const validatePhone = (str: string) => {
  let valid = false
  for (let i = 0; i < str.length - 1; i++) {
    if (str.charAt(i) !== str.charAt(i + 1)) {
      valid = true
      break
    }
  }
  if (str.length > 10) valid = false
  const reg = /^0[3-9]{1}\d{8}/
  if (reg.test(str) && valid) return true
  else return false
}

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z+\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
export const popupOk = (title: string, msg: string, onPress = null) => {
  appStore?.dispatch(changeDialogContent({ isVisible: true, title, content: msg, onPress }))
}

export const popupAlert = (title: string, msg: string, onPress = null, onPressCancel = null) => {
  appStore?.dispatch(
    changeDialogConfirmContent({ isVisible: true, title, content: msg, onPress, onPressCancel }),
  )
}
export const hideEmail = (email?: string) => {
  if (!email || email.length < 3) return "*****"
  else {
    let hidedEmail = ""
    for (let index = 0; index < email.length; index++) {
      if (index < 3 || index === email.length - 1) hidedEmail = hidedEmail + email.charAt(index)
      else hidedEmail = hidedEmail + "*"
    }
    return hidedEmail
  }
}

/**
 * deep clone object
 * @param data d??? li???u
 */
export const deepCloneObject = (data: any) => JSON.parse(JSON.stringify(data))

export const shuffleArray = (array: Array<any>) => {
  const deepCloneArray = deepCloneObject(array)

  for (let i = deepCloneArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deepCloneArray[i], deepCloneArray[j]] = [deepCloneArray[j], deepCloneArray[i]]
  }
  return deepCloneArray
}

export const upperCaseFirstLetterEachWord = (sentence: string) => {
  const words: string[] = sentence.split(" ")
  return words
    .map(
      (item: string) =>
        `${item?.charAt(0).toUpperCase()}${item?.toLowerCase().substring(1, item?.length)}`,
    )
    .join(" ")
    .trim()
}

export const getRandomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const openLink = async (url: string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: "close",
        preferredBarTintColor: colors.whitef2,
        preferredControlTintColor: colors.black0,
        readerMode: false,
        animated: true,
        modalPresentationStyle: "fullScreen",
        modalTransitionStyle: "coverVertical",
        modalEnabled: true,
        enableBarCollapsing: false,
        // Android Properties
        showTitle: true,
        toolbarColor: colors.whitef2,
        secondaryToolbarColor: colors.black0,
        navigationBarColor: "black",
        navigationBarDividerColor: colors.black0,
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        hasBackButton: true,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: "slide_in_right",
          startExit: "slide_out_left",
          endEnter: "slide_in_left",
          endExit: "slide_out_right",
        },
      })
      // Alert.alert(JSON.stringify(result))
    } else Linking.openURL(url)
  } catch (error) {
    Alert.alert(error.message)
  }
}
