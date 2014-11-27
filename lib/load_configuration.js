'use strict';
var path = require('path');

/**
 * Load database configuration from path in .sequelizerc or config/config.json
 *
 * @param {string} rootPath project root path
 * @returns {Object}
 */
module.exports = function loadConfiguration (rootPath) {
  var configPath;
  try {
    configPath = require(path.join(rootPath, '.sequelizerc')).config;
    if (!configPath) {
      throw new Error();
    }
  } catch (err) {
    configPath = path.join(rootPath, 'config/config.json');
  }

  var config;
  try {
    config = require(configPath);
    console.log('Using configuration in', configPath);
  } catch (err) {
    console.error('Configuration not found in', configPath);
    throw err;
  }

  config = config[process.env.NODE_ENV];
  if (!config) {
    console.error('Environment', process.env.NODE_ENV, 'not found in file', configPath);
    throw new Error('environment not found');
  } else {
    return config;
  }
};
