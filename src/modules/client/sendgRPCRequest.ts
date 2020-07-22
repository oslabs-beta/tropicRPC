/**
 * @author : Ed Chow, Shahrukh Khan; July 20, 2020
 * @function : executes the config file, which exports grpc server and proto file data, to be processed
 * @param : {number} port - port of user's running server
 * @param : {string} protoFilePath - absolute path to user's protofile
 * @param : {string} protoPackage - proto package name
 * @param : {string} service - service of gRPC to call
 * @param : {string} method - method of gRPC endpoint to invoke
 * @param : {object} message - body of request to send
 * @returns : null
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const sendgRPCRequest = (
  port: number,
  protoFilePath: string,
  protoPackage: string,
  service: string,
  method: string,
  message: object
) => {
  const packageDef = protoLoader.loadSync(`${protoFilePath}`, {});
  const grpcObject = grpc.loadPackageDefinition(packageDef);
  const userPackage = grpcObject[`${protoPackage}`];
  const client = new userPackage[service](`localhost:${port}`, grpc.credentials.createInsecure());

  client[`${method}`](message, (err, res) => {
    if (err) console.log('error in grpc request: ', err);
    console.log('Received from server ' + JSON.stringify(res));
    return 'Received from server: ' + JSON.stringify(res);
    // display result in tropic output channel
    // const tropicChannel = vscode.window.createOutputChannel('Tropic');
    // tropicChannel.show(true);
    // tropicChannel.append(JSON.stringify(res));
  });
};

module.exports = sendgRPCRequest;
