var SIP_CONSTRUCTOR = require('sip.js/src/SIP');
var SIPjsPackage = require('sip.js/package.json');
var checkEnv = require('./checkEnv');

module.exports = {
  SIP: SIP_CONSTRUCTOR,
  C: require('sip.js/src/Constants')(SIPjsPackage.name, SIPjsPackage.version),
  ENVIRONMENT: function(){
    return require('sip.js/src/environment');
  },
}
