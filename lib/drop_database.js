#!/usr/bin/env node
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Using NODE_ENV=' + process.env.NODE_ENV);

var pg = require('pg');
var config = require('./load_configuration')(process.cwd()),
  hasDatabaseQuery = 'SELECT 1 FROM pg_database WHERE datname=\'' + config.database + '\'',
  createDatabaseQuery = 'DROP DATABASE ' + config.database,
  database = config.database;

// Since we want to connect to PG, not the specific database
delete config.database;

// Protection against stupidity and fuckups
if (process.env.NODE_ENV.indexOf('production') !== -1 && process.env.FORCE !== 'true') {
  console.warn('You were about to drop a production database');
  console.warn('To drop a production database you must pass FORCE=true');
  console.warn('For example: NODE_ENV=production FORCE=true ./node_modules/.bin/drop_database');
  return process.exit(1);
}

var client = new pg.Client(config);
client.connect(clientConnect);

function clientConnect (err) {
  if (err) {
    console.error(err);
    return process.exit(1);
  }

  client.query(hasDatabaseQuery, hasDatabaseCb);
}

function hasDatabaseCb (err, result) {
  if (err) {
    console.error(err);
    return process.exit(1);
  }

  if (!result.rowCount) {
    console.log('Database', database, 'doesn\'t exist');
    client.end();
  } else {
    client.query(createDatabaseQuery, createDatabaseCb);
  }
}

function createDatabaseCb (err) {
  if (err) {
    console.error(err);
    return process.exit(1);
  }

  console.log('Database', database, 'dropped');
  client.end();
}
