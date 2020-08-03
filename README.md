## What is Tropic? :pineapple:
A Visual Studio Code extension that provides gRPC Remote Procedure Call (gRPC) API endpoint testing.

## Core Features :zap:

* Starts your gRPC server.
* Generates a configuration file within the open VSCode project to be filled in with the user's server and request information.
* On save, Tropic will make a remote procedure call from an auto-generated client.
* Tropic supports the following Remote Procedure Call (RPC) types:
  - unary
  - client streaming
  - server streaming
  - bi-directional streaming
* The server response is displayed in the VS Code Tropic output channel.

## Getting Started

### **Setting up the config file**
Open the command palette in VS Code (Cmd/Ctrl + Shift + P) and select `"Tropic: Create Config File"`. A default config file will be generated. Follow the instructions in the config object to update the entry, portNumber, ipAddress, protoFile, and protoPackage.

### Tropic's Mock API
A mock gRPC API was built for testing Tropic during development. This mock API is open sourced for users to test the Tropic extension. It's available on the github repository below.

## Write your first Tropic gRPC Request

Search for Tropic from the command palette in VS Code (Cmd/Ctrl + Shift + P) and run the Activate command.

In the 'request' object, set the values of the 'service', 'method' and 'message' properties to be what you want to include in your RPC.

On every config file save, Tropic will send all the requests and display your server results in the output channel.

```javascript
// add config details here
const config = {
  // change "./server/index.js" to the relative path from the root directory to the file that starts your server
  entry: './server/index.js',

  // change 3000 to the port number on which your server runs
  portNumber: 3000,

  // populate '' with the IP address of your server (exclude portNumber)
  ipAddress: '',

  // change "./demo.proto" to the relative path from the root directory to your proto file
  protoFile: 'src/proto/demo.proto',

  // change "protoPackage" to your proto package's name
  protoPackage: 'protoPackage',
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
```

## Future Features :tropical_drink:
- [ ] Support for additional metadata in request
- [ ] Predictive text for services and methods
- [ ] Schema / service method preview via hovering
- [ ] Auto-identification of gRPC requests
- [ ] Historical log of all requests and responses

## Built By :yellow_heart:
- [Ed Chow](https://github.com/edkchow)
- [Joyce Lo](https://github.com/joycelo)
- [Roseanne Damasco](https://github.com/rosedamasco)
- [Shahrukh Khan](https://github.com/ShahruKhanHub)
- [Steve Canavan](https://github.com/stevencanavan)
