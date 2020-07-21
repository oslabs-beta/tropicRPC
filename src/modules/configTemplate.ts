// add config details here
const config = {
  // change "./server/index.js" to the relative path from the root directory to the file that starts your server
  entry: './server/index.js',

  // change 3000 to the port number on which your server runs
  portNumber: 3000,

  // change "./demo.proto" to the relative path from the root directory to your proto file
  protoFile: 'src/proto/demo.proto',
};

// after activating Tropic extension, add request(s) here and save this file to execute
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
