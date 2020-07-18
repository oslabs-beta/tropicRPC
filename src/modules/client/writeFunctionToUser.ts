/**
 * @author : Roseanne Damasco July 18, 2020
 * @function : write instructions and a function definition to the user's current open file
 * @param : none
 * @returns : none
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 */

import * as vscode from 'vscode';
const fs = require('fs');

const writeFunctionToUser = () => {
  // Confirm there is currently an active test editor
  const currOpenFile = vscode.window.activeTextEditor;
  if (currOpenFile === undefined) {
    vscode.window.showInformationMessage('Please open a file.');
    return null;
  }

  // Get the current open file's path
  const currFilePath = vscode.window.activeTextEditor.document.uri.fsPath;
  // Read the data currently in the file
  const currFileString = fs.readFileSync(currFilePath, 'utf8');

  // Write the instructions, function definition, and user's original text back to the open file
  const expectedUserInput = `/*
 * Expected param: {
 *  service: 'serviceName',
 *  method: 'methodName',
 *  body: {}
 * }
 */`;
  const userFunction = 'const tropicRPC = () => {};';
  fs.writeFileSync(currFilePath, `${expectedUserInput}\n${userFunction}\n\n${currFileString}`);
};

module.exports = writeFunctionToUser;
