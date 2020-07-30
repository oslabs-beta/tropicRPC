import * as vscode from 'vscode';
const fs = require('fs');

const configFileInputsCheck = (
  entryPoint: string,
  ipAddress: string,
  portNumber: number,
  protoFile: string,
  protoPackage: string,
  requestsArr: Array<object>
) => {
  console.log('proto', protoFile);
  if (!fs.existsSync(entryPoint)) {
    vscode.window.showErrorMessage(
      `Entry point server file at '${entryPoint}' does not exist.`
    );
    return null;
  }
  console.log('ip', ipAddress);
  console.log(
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?:[0:9])+$/.test(
      ipAddress
    )
  );
};
module.exports = configFileInputsCheck;
