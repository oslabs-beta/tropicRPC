/**
 * @author : Joyce Lo, Shahrukh Khan; July 18, 2020
 * @author : Joyce Lo, Roseanne Damasco, Steve Canavan; July 20, 2020
 * @function : executes the config file, which exports grpc server and proto file data, to be processed
 * @param : none
 * @returns : none
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

// access the VS Code API
import * as vscode from 'vscode';

// require in fs, path modules, and getRootProjectDir function
const fs = require('fs');
const path = require('path');
const getRootProjectDir = require('./getRootProjectDir');

const onSave = (document: TextDocument) => {
  // create variable to reference root path of user's project
  const rootDir = getRootProjectDir();
  // create variable to reference config file path
  const tropicConfigPath = `${rootDir}/.tropic.config.js`;

  //check if TextDocument is the config file
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
  let requestsArr: object;

  // by default, after requiring in a file/module, the require method maintains a cache of the file/module
  // to account for any subsequent updates to config file, need to invalidate the cache by deleting it
  // if cache is not invalidated, every call to require would result in the same initial output
  delete require.cache[tropicConfigPath];
  // if config file exists, get config and request objects from config file
  const { config, requests } = require(`${tropicConfigPath}`);
  // assign variables to value of user inputs in config file
  entryPoint = path.resolve(rootDir, config.entry);
  portNumber = config.portNumber;
  protoFile = path.resolve(rootDir, config.protoFile);
  requestsArr = Object.values(requests);
  console.log('RESULTING OBJECT*****', {
    entryPoint,
    portNumber,
    protoFile,
    requestsArr,
  });
  // send necessary data to request functionality
};

// export onSave function
module.exports = onSave;
