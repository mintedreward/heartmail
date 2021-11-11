// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
// config['watchFolders'].push(`${__dirname}`)
config['watchFolders'].push(`${__dirname}/../../../`)

module.exports = config;
