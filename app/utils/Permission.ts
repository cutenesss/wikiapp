import { popupOk } from "@configs/functions"
import { translate } from "@i18n"
import { requestMultiple, PERMISSIONS, checkMultiple, RESULTS } from "react-native-permissions"
/**
 * to check permission before recording
 * @param callback callback will run after check permisson (start mic)
 */
export const checkPermissionLocation = (callback: () => void) => {
  checkMultiple([
    PERMISSIONS.IOS.LOCATION_ALWAYS,
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  ]).then((statuses) => {
    if (
      statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.DENIED ||
      statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.DENIED ||
      statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.DENIED
    ) {
      requestMultiple([
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.LOCATION_ALWAYS,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ])
    } else if (
      statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.BLOCKED ||
      statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.BLOCKED ||
      statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.BLOCKED
    ) {
      popupOk(translate("NOTICE_MIC"), translate("KHONG_CHO_DUNG_MIC"))
    } else if (
      statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED ||
      statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED ||
      statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED
    ) {
      callback()
    }
  })
}
