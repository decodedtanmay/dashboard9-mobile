const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "@tanstack/query-core") {
    return context.resolveRequest(
      context,
      "@tanstack/query-core/build/legacy/index.js",
      platform
    );
  }
  if (moduleName === "@tanstack/react-query") {
    return context.resolveRequest(
      context,
      "@tanstack/react-query/build/legacy/index.js",
      platform
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
