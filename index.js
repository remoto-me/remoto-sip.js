var SIP_CONSTRUCTOR = require('sip.js/src/SIP');
var checkEnv = require('./checkEnv');

module.exports = {
  SIP: SIP_CONSTRUCTOR,
  ENVIRONMENT: function(){
    return require('sip.js/src/environment');
  },
  checkEnv: checkEnv,
}
