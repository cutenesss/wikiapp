## Getting Started

Installation process

- Create new ignite app
- Add lodash
- Add react-redux, redux-saga, redux
- Add @sentry/react-native
- Add react-native-code-push
- Add Async Storage
- Add UI Kitten
- Add husky
- Add commit-lint
- Add moment
- Add Toast
- Add react-native-keyboard-aware-scroll-view

## Create new ignite app

Run the CLI:

```bash
# for vanilla React Native
npx ignite-cli new YourAppName
# or for Expo-powered:
npx ignite-cli new YourAppName --expo
```

## Add lodash

```bash
# using yarn
yarn add lodash
```

## Add redux, react-redux, redux-saga.

- React Redux is the official React binding for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update data.
- Redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

```bash
# using yarn
yarn add redux
yarn add react-redux
yarn add redux-saga
yarn add reactotron-react-native
```

## Add @sentry/react-native

- Automatic Native Crash Error Tracking
- Automatic JS Error Tracking

Read [sentry setup instructions](https://github.com/getsentry/sentry-react-native/blob/master/README.md).

## Add react-native-code-push

- This plugin provides client-side integration for the CodePush service, allowing you to easily add a dynamic update experience to your React Native app(s).

Read [react-native-code-push setup instructions](https://github.com/microsoft/react-native-code-push/blob/master/README.md).

## Add Async Storage

- AsyncStorage is an unencrypted, asynchronous, persistent, key-value storage system that is global to the app. It should be used instead of LocalStorage.

```bash
# using yarn
- yarn add @react-native-community/async-storage

```

## Add UI Kitten

- UI Kitten is a customizable React Native UI Library based on Eva Design System specifications, with 30+ UI components, 2 visual themes, and other supporting modules.

```bash
# using yarn
- yarn add @ui-kitten/components @eva-design/eva react-native-svg

```

Read [UI Kitten docs](https://akveo.github.io/react-native-ui-kitten/docs).

## Add husky

- Husky lets us run commands or script before committing or pushing our code to git.

```bash
# add this lint to package.json
 ...
  "husky": {
    "hooks": {
      "pre-commit": "eslint index.js app test --fix --ext .js,.ts,.tsx && yarn format",
    }
  }
```

Read [More about husky](https://github.com/typicode/husky).

## Add commitlint

- Husky lets us run commands or script before committing or pushing our code to git.

```bash
# add this
yarn add -D @commitlint/cli
yarn add -D @commitlint/config-conventional
```

```bash
# add this lint to package.json
 ...
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
}
```

Read [More about commitlint](https://github.com/conventional-changelog/commitlint).

## Add moment

- A JavaScript date library for parsing, validating, manipulating, and formatting dates.

```bash
# using yarn
yarn add moment

```

Read [More about moment](https://momentjs.com/).

## Add react-native-root-toast

- Showing a toast Support both Android and iOS.

```bash
# using yarn
yarn add react-native-root-toast

```

## Add react-native-keyboard-aware-scroll-view

- A ScrollView component that handles keyboard appearance and automatically scrolls to focused TextInput.

```bash
# using yarn
yarn add react-native-keyboard-aware-scroll-view

```

## Delete folder ignite, storybook.

## Remove library: mobx, mobx-react-lite, mobx-state-tree, @storybook/addon-storyshots, @storybook/react-native-server, @storybook/react-native.
