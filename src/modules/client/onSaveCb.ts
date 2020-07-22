/**
 * @author : Joyce Lo, Shahrukh Khan; July 18, 2020
 * @author : Joyce Lo, Roseanne Damasco, Steve Canavan; July 20, 2020
 * @function : executes the config file, which exports grpc server and proto file data, to be processed
 * @param : {TextDocument} document - file that was saved
 * @param : {OutputChannel} tropicChannel - output channel for VS Code extension
 * @param : {string} tropicConfigPath - path to Tropic config file
 * @param : {string} rootDir - path to user's project root directory
 * @returns : null
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

// access the VS Code API
import * as vscode from 'vscode';

// require in fs, path, and getRootProjectDir function/module
const fs = require('fs');
const path = require('path');
const getRootProjectDir = require('./getRootProjectDir');
const sendgRPCRequest = require('./gRPCRequest');

const onSave = (
  document: TextDocument,
  tropicChannel: OutputChannel,
  tropicConfigPath: string,
  rootDir: string
) => {
  // show and clear Tropic output channel
  tropicChannel.show(true);
  tropicChannel.clear();

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
  let entryPoint: string;
  let portNumber: number;
  let protoFile: string;
  let protoPackage: string;
  let requestsArr: Array<object>;

  // by default, after requiring in a file/module, the require method maintains a cache of the file/module
  // to account for any subsequent updates to config file, need to invalidate the cache by deleting it
  // if cache is not invalidated, every call to require would result in the same initial output
  delete require.cache[tropicConfigPath];
  // get config and request objects from config file
  const { config, requests } = require(`${tropicConfigPath}`);

  // assign variables to value of user inputs in config file
  entryPoint = path.resolve(rootDir, config.entry);
  portNumber = config.portNumber;
  protoFile = path.resolve(rootDir, config.protoFile);
  protoPackage = config.protoPackage;
  requestsArr = Object.values(requests);

  // send each request to gRPC handler
  requestsArr.map((request: object) =>
    sendgRPCRequest(
      portNumber,
      protoFile,
      protoPackage,
      request.service,
      request.method,
      request.message
    )
  );
};

// export onSave function
module.exports = onSave;
