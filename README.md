## What is tropicRPC? :pineapple:
A Visual Studio Code extension that provides gRPC Remote Procedure Call (gRPC) API endpoint testing.

## Core Features :zap:

* Starts your gRPC server
* Generates a configuration file within the open VS Code project to be populated with the user's server and request information
* On save, tropicRPC will make a remote procedure call (RPC) from an auto-generated client
* tropicRPC supports the following RPC types:
  - unary
  - client-streaming
  - server-streaming
  - bidirectional streaming
* The server response is displayed in the VS Code tropicRPC output channel

## Getting Started

### **Installation**
tropicRPC can be installed from the VS Code Extensions Marketplace [here]().

### **Setting up the config file**
Open the command palette in VS Code (Cmd/Ctrl + Shift + P) and select `tropicRPC: Create Config File`. A default config file will be generated. Follow the instructions in the config object to update the entry, portNumber, ipAddress, protoFile, and protoPackage.

### **tropicRPC's mock API**
A mock gRPC API was built for testing tropicRPC during development. This mock API is open-sourced for users to test the tropicRPC extension. It's available in this [GitHub repository](https://github.com/tropicRPC/Mock-gRPC-API).

## Write Your First tropicRPC gRPC Request

1. Search for tropicRPC using the VS Code Command Palette (Cmd/Ctrl + Shift + P) and run the `tropicRPC: Activate` command.

2. In the 'request' object, set the values of the 'service', 'method', and 'message' properties appropriately.

3. On every config file save, tropicRPC will send the request(s) and display your server results in the output channel.
    * For unary and server-streaming RPCs, add fields as properties on request object
    * For client-streaming and bidirectional RPCs, add each stream as an object nested under the request object

```javascript
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
    method: 'unaryMethod',
    message: {
      field1: 0,
      field2: 'Hello World',
    },
  },
  Request2: {
    service: 'serviceName',
    method: 'clientStreamingMethod',
    message: {
      0: {
        field1: 0,
        field2: 'Hello World', 
      },
      1: {
        field1: 1,
        field2: 'Bye World',
      },
    },
  },
  // add additional request objects below, as necessary, using the above format
};
```

## Ending Your tropicRPC Session

When you are ready to end your session, search for tropicRPC using the VS Code Command Palette (Cmd/Ctrl + Shift + P) and run the `tropicRPC: Deactivate` command. Deactivating the extension will stop your server.

## Troubleshooting: Changing your server path

After initially setting your server path, any additional updates to the path will require the extension to be deactivated and then reactivated for changes to take effect.

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
