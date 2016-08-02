var SIP_CONSTRUCTOR = require('sip.js/src/SIP');
var SIP_ENVIRONMENT = require('sip.js/src/environment');
var checkEnv = require('./checkEnv');

module.exports = {
  SIP: SIP_CONSTRUCTOR,
  ENVIRONMENT: SIP_ENVIRONMENT,
  checkEnv: checkEnv,
}
