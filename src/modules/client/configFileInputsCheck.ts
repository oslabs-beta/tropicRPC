import * as vscode from 'vscode';
const fs = require('fs');

const configFileInputsCheck = (
  entryPoint: string,
  portNumber: number,
  ipAddress: string,
  protoFile: string,
  protoPackage: string,
  requestsArr: Array<object
) => {
  if (fs.existsSync(entryPoint)) {
    console.log('The path exists.');
  }
};
module.exports = configFileInputsCheck;
