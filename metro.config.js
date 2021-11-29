const defaultSourceExts = require("metro-config/src/defaults/defaults").sourceExts
const { getDefaultConfig } = require("metro-config")

// module.exports = {
//   resolver: {

//       assetExts: [...assetExts, 'bin'],
//   },
// }
module.exports = (async () => {
  const defaultConfig = await getDefaultConfig()
  const { assetExts } = defaultConfig.resolver
  return {
    resolver: {
      sourceExts: process.env.RN_SRC_EXT
        ? process.env.RN_SRC_EXT.split(",").concat(defaultSourceExts)
        : defaultSourceExts,
      // Add bin to assetExts
      assetExts: [...assetExts, "bin"],
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
  }
})()
