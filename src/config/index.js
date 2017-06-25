import * as dev from './development';

const CUR_ENV = process.env.NODE_ENV;

let settings;

switch (CUR_ENV) {
  default:
    settings = dev;
    break;
}

module.exports = settings;
