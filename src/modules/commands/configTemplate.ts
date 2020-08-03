// add config details here
const config = {
  // OPTIONAL: change './server/index.js' to the relative path from the root directory to the file that starts your server
  // or '' if you do not need tropicRPC to start your server
  entry: './server/index.js',

  // OPTIONAL: change 3000 to the port number on which your server runs
  portNumber: 3000,

  // OPTIONAL: populate '' with the IP address of your server (exclude portNumber)
  ipAddress: '',

  // change './demo.proto' to the relative path from the root directory to your proto file
  protoFile: 'src/proto/demo.proto',

  // change 'protoPackage' to your proto package's name
  protoPackage: 'protoPackage',
};

// after activating tropicRPC extension, add request(s) here and save this file to execute
const requests = {
  // customize your request values below
  request1: {
    service: 'serviceName',
    method: 'methodName',
    message: {},
  },
  // add additional request objects below, as necessary, using the above format
};

module.exports = { config, requests };
