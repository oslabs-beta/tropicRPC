/**
 * @author : Steve Canavan; July 30, 2020
 * @function : checks for correct format of server info and existence of proto files
 * @param : {number} portNumber - port of user's running server
 * @param : {string} ipAddress - IP address of user's running server
 * @param : {string} protoFile - absolute path to user's protofile
 * @returns : boolean
 * @changelog : ## Steve Canavan, July 30, 2020, checks for correct format of ipAddress and portNumber, and existence of proto file.
 * * */

import * as vscode from 'vscode';
const fs = require('fs');

const validateConfigFileInputs: Function = (
  ipAddress: string,
  portNumber: number,
  protoFile: string
): boolean => {
  // check if ipAddress format is valid
  if (
    !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)+$/.test(
      ipAddress
    ) &&
    ipAddress
  ) {
    vscode.window.showErrorMessage(`Please update '${ipAddress}' to be a valid IP address`);
    return false;
  }

  // check if port number format is valid
  if (
    !/^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$/.test(
      `${portNumber}`
    )
  ) {
    vscode.window.showErrorMessage(`Please update ${portNumber} to be a valid port number.`);
    return false;
  }

  // check if proto file exists at protoFile path
  if (!fs.existsSync(protoFile)) {
    vscode.window.showErrorMessage(`Proto file does not exist at '${protoFile}'`);
    return false;
  }

  // return true if all if statements evaluate to false
  return true;
};
module.exports = validateConfigFileInputs;
