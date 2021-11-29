import { Alert } from "react-native"
/**
 * To show alert of react-native
 * @param config the config of alert
 */
export const showAlert = (config: {
  title: string
  message: string
  disableCancel?: boolean
  leftTitle?: string
  rightTitle?: string
  onPressCan?: () => void
  onPressOk?: () => void
}): void => {
  const buttonDisableCancel = [
    {
      text: config.rightTitle || "OK",
      onPress: () => {
        config.onPressOk && config.onPressOk()
      },
    },
  ]
  const buttonCancelable = [
    {
      text: config.leftTitle || "Cancel",
      onPress: () => {
        config.onPressCan && config.onPressCan()
      },
    },
    {
      text: config.rightTitle || "OK",
      onPress: () => {
        config.onPressOk && config.onPressOk()
      },
    },
  ]

  Alert.alert(
    config.title,
    config.message,
    config.disableCancel ? buttonDisableCancel : buttonCancelable,

    { cancelable: config.disableCancel },
  )
}
