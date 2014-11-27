#!/usr/bin/env node
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Using NODE_ENV=' + process.env.NODE_ENV);

var pg = require('pg');
var config = require('./load_configuration')(process.cwd()),
  hasDatabaseQuery = 'SELECT 1 FROM pg_database WHERE datname=\'' + config.database + '\'',
  createDatabaseQuery = 'CREATE DATABASE ' + config.database,
  database = config.database;

// Since we want to connect to PG, not the specific database
delete config.database;

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

  if (result.rowCount) {
    console.log('Database', database, 'already exists');
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

  console.log('Database', database, 'created');
  client.end();
}
