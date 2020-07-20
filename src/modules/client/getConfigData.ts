/**
 * @author : Joyce Lo, Shahrukh Khan; July 18, 2020
 * @function : parse through user's config file to gather server port, entry point path, and .proto file path
 * @param : none
 * @returns : an object with the entry point path, server port, and .proto file path
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 * * */

// access the VS Code API
import * as vscode from 'vscode';

// require in fs and path modules
const fs = require('fs');
const path = require('path');
const getRootProjectDir = require('./getRootProjectDir');

function getConfigData() {
  //create variable to reference root path of user's project
  const rootDir = getRootProjectDir();
  // create variable to reference config file path
  const tropicConfigPath = `${rootDir}/.tropic.config.js`;

  // declare variables and corresponding data types to reference user inputs in config file
  let entryPoint: string;
  let portNumber: number;
  let protoFile: string;

  // check if config file exists in file system
  if (fs.existsSync(tropicConfigPath)) {
    // if config file exists, require config details in as an object
    const { config } = require(`${tropicConfigPath}`);
    // assign variables to value of user inputs in config file
    entryPoint = path.resolve(rootDir, config.entry);
    portNumber = config.portNumber;
    protoFile = path.resolve(rootDir, config.protoFile);
    // return object with three key-value pairs
    // in each pair, key and value are the same, so they are shown as one word
    console.log('RESULTING OBJECT*****', { entryPoint, portNumber, protoFile });
    return { entryPoint, portNumber, protoFile };
  }
  // if config file does not exist in file system, display message instructing user to create config file
  vscode.window.showInformationMessage('Please create a config file.');
  return null;
}

// export module
module.exports = getConfigData;
