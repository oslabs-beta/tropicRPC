/**
 * @author : Joyce Lo, Shahrukh Khan; July 18, 2020
 * @author : Joyce Lo, Roseanne Damasco, Steve Canavan; July 20, 2020
 * @author : Steve Canavan; July 30, 2020
 * @function : executes the config file, which exports grpc server and proto file data, to be processed
 * @param : {TextDocument} document - file that was saved
 * @param : {OutputChannel} tropicChannel - output channel for VS Code extension
 * @param : {string} tropicConfigPath - path to Tropic config file
 * @param : {string} rootDir - path to user's project root directory
 * @returns : null
 * @changelog : ## Steve Canavan, July 30, 2020, passes config file inputs to validateConfigFileInputs function
 * ## returns null and exits the on save function is validateConfigFileInputs returns false
 * * */

// access the VS Code API
import * as vscode from 'vscode';

// require in fs, path, and getRootProjectDir function/module
const fs = require('fs');
const path = require('path');
const sendgRPCRequest = require('./sendgRPCRequest');
const validateConfigFileInputs = require('./validateConfigFileInputs');

const onSave = (
  document: vscode.TextDocument,
  tropicChannel: vscode.OutputChannel,
  tropicConfigPath: string,
  rootDir: string
) => {
  //check if TextDocument is not the config file
  if (document.uri.fsPath !== tropicConfigPath) {
    // if config file does not exist in file system, display message instructing user to create config file
    if (!fs.existsSync(tropicConfigPath)) {
      vscode.window.showInformationMessage(
        'Tropic is Active.  Please create a config file, or deactivate Tropic.'
      );
    }
    // exit function
    return null;
  }

  // declare variables and corresponding data types to reference user inputs in config file
  let portNumber: number;
  let ipAddress: string;
  let protoFile: string;
  let protoPackage: string;
  let requestsArr: Array<object>;

  // show and clear Tropic output channel
  tropicChannel.show(true);
  tropicChannel.clear();

  // by default, after requiring in a file/module, the require method maintains a cache of the file/module
  // to account for any subsequent updates to config file, need to invalidate the cache by deleting it
  // if cache is not invalidated, every call to require would result in the same initial output
  delete require.cache[tropicConfigPath];
  // get config and request objects from config file
  const { config, requests } = require(`${tropicConfigPath}`);

  // assign variables to value of user inputs in config file
  ipAddress = config.ipAddress;
  portNumber = config.portNumber;
  protoFile = path.resolve(rootDir, config.protoFile);
  protoPackage = config.protoPackage;
  requestsArr = Object.values(requests);

  // check for valid proto files, ip addresses, and port numbers
  if (!validateConfigFileInputs(ipAddress, portNumber, protoFile)) return null;

  tropicChannel.append('Tropic Results:\n\n');
  // send each request to gRPC handler
  requestsArr.forEach((request: object) =>
    sendgRPCRequest(
      portNumber,
      ipAddress,
      protoFile,
      protoPackage,
      request.service,
      request.method,
      request.message,
      tropicChannel
    )
  );
};

// export onSave function
module.exports = onSave;
