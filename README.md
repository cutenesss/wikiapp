# Welcome to ignited app!

[![CircleCI](https://circleci.com/gh/infinitered/ignite.svg?style=svg)](https://circleci.com/gh/infinitered/ignite)

## The latest and greatest boilerplate for Infinite Red opinions

This is the boilerplate that [Infinite Red](https://infinite.red) uses as a way to test bleeding-edge changes to our React Native stack.

Currently includes:

- React Native
- React Navigation
- MobX State Tree
- React Redux
- Redux Saga
- Sentry
- Lodash
- Codepush
- TypeScript
- And more!

## Quick Start

The AIS boilerplate project's structure will look similar to this:

```
ignite-project
├── app
│   ├── actions
│   ├── apis
│   ├── assets
│   ├── common
│   ├── components
│   ├── configs
│   ├── i18n
│   ├── utils
│   ├── navigation
│   ├── sagas
│   ├── screens
│   ├── stores
│   ├── types
│   ├── app.tsx
│   ├── env.ts
│   ├── RootView.tsx
├── test
│   ├── __snapshots__
│   ├── storyshots.test.ts.snap
│   ├── mock-i18n.ts
│   ├── mock-reactotron.ts
│   ├── setup.ts
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── ignite
│   ├── ignite.json
│   └── plugins
├── index.js
├── ios
│   ├── IgniteProject
│   ├── IgniteProject-tvOS
│   ├── IgniteProject-tvOSTests
│   ├── IgniteProject.xcodeproj
│   └── IgniteProjectTests
├── .env
└── package.json

```

### ./app directory

Included in an Ignite boilerplate project is the `app` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the src directory looks similar to the following:

```
app
│── actions
│── apis
│── assets
│── common
│── components
│── configs
│── i18n
├── navigation
│── reducers
│── sagas
├── screens
│── stores
│── types
├── utils
│── app.tsx
│── env.ts
└── RootView.tsx

```

**actions**
This is where your actions (redux) will live. An action as an event that describes something that happened in the application

**apis**
REST APIs live here. Includes apis call, hanlde apis call, url used in app.

**common**
This is where your React components that can be reuse will live.

**components**
This is where your React components will live. Each component will have a directory containing the `.tsx` file, along with a story file, and optionally `.presets`, and `.props` files for larger components. The app will come with some commonly used components like Button.

**configs**
This is where your app configs will live. Includes functions used in app (responsive, ...)

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**navigation**
This is where your `react-navigation` navigators will live.

**reduces**
This is a reducer - a function that takes a current state value and an action object describing "what happened", and returns new state value. A reducer's function signature is: (state, action) => newState

**sagas**
This is where your redux saga will live

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**theme**
Here lives the theme for your application, including spacing, colors, and typography.

**types**
This is where interface or type of Object will live.

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truely shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

**evn.ts** This is where app's environment configs will live.

**RootView.tsx** This wil configs some library used frequently in the application for example OneSignal or Check internet connection.

### ./test directory

This directory will hold your Jest configs and mocks.

## Running e2e tests

Read [e2e setup instructions](./e2e/README.md).

## Previous Boilerplates

- [2018 aka Bowser](https://github.com/infinitered/ignite-bowser)
- [2017 aka Andross](https://github.com/infinitered/ignite-andross)
- [2016 aka Ignite 1.0](https://github.com/infinitered/ignite-ir-boilerplate-2016)
