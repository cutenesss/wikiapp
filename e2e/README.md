# Detox End-To-End Testing

## Setup

Detox was added in this project, please export environment varible to use it

```bash
yarn global add detox-cli
```

If you use macos, run below command. Please note that you have iPhone 11 simulator device:

```bash
brew tap wix/brew && brew install applesimutils && yarn global add detox-cli
```

If you use window, please install **Nexus_5_API_29** device by android studio.

## Adding tests

We've gotten you started with `./e2e/firstTest.e2e.js`, which tests that the two main example screens render properly.

Note that in order to pick up elements by ID, we've added the `testID` prop to the component.

## Building binary file to testID

Before run test, you must build apk/ipa file to test. If you had binary file before and didn't change testID, you can skip this step.

Export varivle (use for mock library)
_Window_

```bash
set RN_SRC_EXT="e2e.js,e2e.ts,e2e.tsx"
```

_MacOs_

```bash
export RN_SRC_EXT="e2e.js,e2e.ts,e2e.tsx"
```

Now, you can start build binary file to test

Building ipa:

```bash
yarn build:e2e:ios
```

Building apk:

```bash
yarn build:e2e
```

## Running test

Before run test, you must build apk/ipa file to test. If you had binary file before and didn't change testID, you can skip this step.

Android:

```bash
yarn test:e2e
```

Ios:

```bash
yarn test:e2e:ios
```
