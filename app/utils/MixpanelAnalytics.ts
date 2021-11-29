import { Mixpanel } from "mixpanel-react-native"

let mixpanelInstance
const TOKEN_MIXPANEL = ""

export const initMixpanel = async () => {
  mixpanelInstance = await Mixpanel.init(TOKEN_MIXPANEL) // token project
}
/**
 * To track an event to sent it to server
 * @param eventTag String: Tag for event. Like "User press Login"
 * @param trackBody Object: Body to tracking
 */
export const trackEvent = (eventTag: MixPanelEvent, trackBody) => {
  trackBody && mixpanelInstance?.track(eventTag, trackBody)
}
/**
 * To identify user. Tips: use user id to identify
 * @param USER_ID string
 */
export const identifyUser = (USER_ID: string) => {
  mixpanelInstance?.identify(USER_ID)
}
/**
 * Set property for user (Acount infomation)
 * @param userProperty Object {key: value}: user property
 */
export const setUserProperty = (userProperty) => {
  Object.keys(userProperty).map((key) => {
    userProperty[key] && mixpanelInstance.people.set(key, userProperty[key].toString())
    return userProperty[key]
  })
}

/**
 * To set email (verible define by mixpanel, difference from user property)
 * @param {*} userEmail String: email
 */
export const setUserEmail = (userEmail) => {
  mixpanelInstance.people.set({
    $email: userEmail,
  })
}

/**
 * Reset instance. Call when user logout
 */
export const resetMixpanel = () => mixpanelInstance?.reset()

/**
 * Custom constand for filter
 */
export enum MixPanelEvent {
  LOG_IN = "User đăng nhập",
  LOG_OUT = "User đăng xuất",
}
