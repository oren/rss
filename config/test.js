"use strict";

var config = {
  environment: 'test',
  db: require('../mock-db.js'),
  getAll: require('../mock-getAll.js'),
  getRead: require('../mock-getRead.js')
}

module.exports = config;

