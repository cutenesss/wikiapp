module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {
      plugins: ["transform-remove-console"], //removing consoles.log from app during release (production) versions
    },
  },
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@assets": "./app/assets",
          "@R": "./app/assets/R",
          "@common": "./app/common",
          "@configs": "./app/configs",
          "@screens": "./app/screens",
          "@navigation": "./app/navigation",
          "@stores": "./app/stores",
          "@helpers": "./app/helpers",
          "@libraries": "./app/libraries",
          "@apis": "./app/apis",
          "@routers": "./app/routers",
          "@apis": "./app/apis",
          "@actions": "./app/redux/actions",
          "@components": "./app/components",
          "@models": "./app/models",
          "@redux": "./app/redux",
          "@sagas": "./app/redux/sagas",
          "@services": "./app/services",
          "@types": "./app/types",
          "@theme": "./app/theme",
          "@utils": "./app/utils",
          "@hook": "./app/hooks",
          "@i18n": "./app/i18n",
        },
      },
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
  ],
}
