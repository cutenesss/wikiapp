let NODE_DEV = "development"

// eslint-disable-next-line no-undef
if (__DEV__) {
  NODE_DEV = "production"
} else {
  NODE_DEV = "production"
}

const serverURL = "http://192.168.1.177:3000" // development
// const serverURL ="http://165.22.108.71:3000" // production

const socketURL = "http://165.22.108.71:8888" // development
// const socketURL = "http://165.22.108.71:8888" // production

export const CodePushKey = {
  ANDROID: "UNGVIipA3CIPuSDj9gW4uD_KXoHamOsdFgIRa", // staging
  // ANDROID: "AsXSZtjJUEeEg02oeWN9JCQhHBfRoBdl7V56S", // production
  IOS: "0wLF5gYAs8AZWmNclACvUMIuh8cdjqVSzqm99", // staging
  // IOS: "PmlIchJ-oPMXSwkLPoqPINzYeitxpGa-jNr3D" // production
}

export const OneSignalKey = "df75e3f2-d6a0-412f-9ad8-1fedc62b64c9" // development
// export const oneSignalKey = "e70d0dfe-31b2-490d-b817-1d83dc594d2c" // production

const SENTRY_KEY = "sentry-key-here"

export default {
  currentNode: NODE_DEV,
  serverURL: serverURL,
  socketURL: socketURL,
  sentryKey: SENTRY_KEY,
}
