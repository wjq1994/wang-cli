[
    'logger',
    'spinner',
    'exit'
  ].forEach(m => {
    Object.assign(exports, require(`./lib/${m}`))
  })
  // Node自带
  exports.path = require('path');

  exports.chalk = require('chalk');
  exports.execa = require('execa');
  exports.semver = require('semver');
  exports.fs = require('fs-extra');
  exports.inquirer = require('inquirer');
  