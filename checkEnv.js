// these are required to be functions upon initialization (can be vendor-prefixed)
var ENV_METHODS = [
  'MediaStream',
  'getUserMedia',
  'RTCPeerConnection',
  'RTCSessionDescription',
  'addEventListener',
]

// these are required to exist upon initialization (can't be vendor prefixed)
var ENV_PROPS = [
  'WebSocket',
  'open',
  'Promise',
  'timers',
  'console',
  'HTMLMediaElement',
  'attachMediaStream',
  'createObjectURL',
  'revokeObjectURL',
];

function isBindableFunction(method){
  return (typeof method === 'function') && (typeof method.bind === 'function')
}

function getPrefixedPropertyName(object, name) {
  // adapted from onsip/SIP.js/src/environment_browser.js :: getPrefixedProperty
  // avoids throwing bind errors

  if (object == null) {
    return;
  }
  var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  var prefixedNames = [name, 'webkit' + capitalizedName, 'moz' + capitalizedName];
  return prefixedNames.reduce(function(previous, current){
    return previous || (object[current] ? current : undefined)
  }, undefined)
};

function checkPropAgainstEnv(env){
  return function(prop){
    if(typeof env[prop] === 'undefined'){
      throw new Error(prop+' is not defined')
    }
    if(env[prop] === null){
      throw new TypeError(prop+' is null')
    }
  }
}

function checkMethodAgainstEnv(env){
  return function(prop){
    var methodName = getPrefixedPropertyName(env, prop);
    var method = env[methodName]
    if(typeof method !== 'function'){
      throw new TypeError(methodName +' <'+(typeof method)+'> is not a function.')
    }
  }
}

function checkEnv(env){
  ENV_PROPS.forEach(checkPropAgainstEnv(env))
  ENV_METHODS.forEach(checkMethodAgainstEnv(env));

  // taken from onsip/SIP.js/src/WebRTC.js
  var requiredMethodsForWebRTCSupport = [
    env.RTCPeerConnection,
    env.RTCSessionDescription,
    env.getUserMedia
  ]

  // returns whether SIP.js thinks the environment supports WebRTC
  return requiredMethodsForWebRTCSupport.every(isBindableFunction)
}

module.exports = checkEnv
