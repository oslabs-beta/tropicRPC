/**
 * @author : Ed Chow, Shahrukh Khan; July 20, 2020
 * @function : executes gRPC request submitted by user
 * @param : {number} port - port of user's running server
 * @param : {string} ipAddress - IP address of user's running server
 * @param : {string} protoFilePath - absolute path to user's protofile
 * @param : {string} protoPackage - proto package name
 * @param : {string} service - service of gRPC to call
 * @param : {string} method - method of gRPC endpoint to invoke
 * @param : {object} message - body of request to send
 * @param : {object} tropicChannel - reference to Tropic's output channel
 * @returns : null
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * ## Steve Canavan, July 29, 2020, added functionality to include calls to server IP addresses
 * ## Ed Chow, July 29, 2020, added client streaming functionality
 * ## Roseanne, July 29, 2020, error handling for protopackage, service, and method inputs,
 *    and modularized displaying output message
 * * */

import * as vscode from 'vscode';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const displayOutputMessage = require('./displayOutputMessage');

const sendgRPCRequest = (
  port: number,
  ipAddress: string,
  protoFilePath: string,
  protoPackage: string,
  service: string,
  method: string,
  message: object,
  tropicChannel: vscode.OutputChannel
) => {
  // read proto file and save as package definition (protocol buffer)
  // protoLoader compiles proto files into JS object
  const packageDef = protoLoader.loadSync(`${protoFilePath}`, {});

  // read package definition and save packages in a grpc object
  const grpcObject = grpc.loadPackageDefinition(packageDef);

  // confirm that inputted protoPackage exist in proto file
  if (!grpcObject.hasOwnProperty(protoPackage)) {
    // if not, inform user of error
    const errorMessage: string = `ERROR: Proto package '${protoPackage}' was not found in your proto file\n\n`;
    displayOutputMessage(tropicChannel, service, method, message, errorMessage);
    return null;
  }

  // confirm that inputted service exist in proto package
  if (!packageDef.hasOwnProperty(`${protoPackage}.${service}`)) {
    // if not, inform user of error
    const errorMessage: string = `ERROR: Service '${service}' was not found in '${protoPackage}'\n\n`;
    displayOutputMessage(tropicChannel, service, method, message, errorMessage);
    return null;
  }

  // get the specific package object that we want to work with
  const userPackage = grpcObject[`${protoPackage}`];

  // confirm that inputted method exist in service
  if (!packageDef[`${protoPackage}.${service}`][method]) {
    // if not, inform user that method is not included in their specified service
    const errorMessage: string = `ERROR: Method '${method}' was not found in '${service}' service\n\n`;
    displayOutputMessage(tropicChannel, service, method, message, errorMessage);
    return null;
  }

  // create a connection to the gRPC server, for a specific service
  // return an object with all of the methods within that service, and save as client
  // grpc.credentials.createInsecure(): communication will be in plain text, i.e. non-encrypted
  const client = new userPackage[service](
    ipAddress ? ipAddress : `localhost:${port}`,
    grpc.credentials.createInsecure()
  );

  // invoke client object's method
  const call = client[`${method}`](message, (err, response) => {
    if (err) {
      const errorMessage: string = `ERROR: CODE ${err.code} - ${err.details}`;
      displayOutputMessage(tropicChannel, service, method, message, errorMessage);
      return null;
    }

    // generate formatted response message string
    const responseStr = JSON.stringify(response, null, 2);

    // display response in tropic output channel
    displayOutputMessage(tropicChannel, service, method, message, responseStr);

    // exit function
    return null;
  });

  // const keys = Object.keys(message);
  // for (let i = 0; i < keys.length; i += 1) {
  //   call.write(message[keys[i]]);
  // }
  // call.end();

  // declare streamed varaible to store server streamed data
  const streamed: Array<object> = [];

  // method for server streaming; will return an object
  call.on('data', (data) => streamed.push(data));

  call.on('end', () => {
    // generate formatted response message string
    const responseStr = JSON.stringify(Object.assign({}, streamed), null, 2);

    // display response in tropic output channel
    displayOutputMessage(tropicChannel, service, method, message, responseStr);

    return null;
  });
};

module.exports = sendgRPCRequest;
