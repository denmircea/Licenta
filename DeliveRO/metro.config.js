// metro.config.js
// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');


const config = getDefaultConfig(__dirname);

// --- Add this section ---
config.watchFolders = [
  __dirname,
  path.resolve(__dirname, 'app'), // Watch the 'app' folder (where your file is)
];
// --- End of added section ---

// Add your custom resolver logic here
config.resolver.resolveRequest = (context, moduleName, platform) => {
  const { resolveRequest: defaultResolveRequest } = context;

  if (platform === 'web' && moduleName === 'react-native-maps') {
    return {
      type: 'sourceFile',
      filePath: path.resolve(__dirname, './app/ViewCommon/Maps/WebMapView.tsx'),
    };
  }

  return defaultResolveRequest(context, moduleName, platform);
};

module.exports = config;