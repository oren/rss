"use strict";

var config = {
  environment: 'development',
  db: require('../db.js'),
  getAll: require('../getAll.js'),
  getRead: require('../getRead.js')
}

module.exports = config;
