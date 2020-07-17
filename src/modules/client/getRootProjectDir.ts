/**
 * @author : Roseanne Damasco July 16, 2020
 * @function : get root directory path
 * @param : none
 * @returns : string of root directory
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 */

import * as vscode from 'vscode';

const fs = require('fs');

const getRootProjectDir = () => {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  const currOpenFile = vscode.window.activeTextEditor;
  // Confirm that a project is open
  if (workspaceFolders === undefined) {
    vscode.window.showInformationMessage('Please open a project.');
    return null;
  }
  // Confirm that a file is open
  if (currOpenFile === undefined) {
    vscode.window.showInformationMessage('Please open a file.');
    return null;
  }
  // Get the paths for the main folder and open file
  const currWorkspacePath = workspaceFolders[0].uri.fsPath;
  const currFilePath = currOpenFile.document.uri.fsPath;

  const workspaceArr = currWorkspacePath.split('/');
  const fileArr = currFilePath.split('/');

  // Traverse through folders between main folder and open file
  // return the folder path where package.json file exists
  let rootProjPath = workspaceArr;
  for (let i = rootProjPath.length; i < fileArr.length; i += 1) {
    const lookingFor = `${rootProjPath.join('/')}/package.json`;
    if (fs.existsSync(lookingFor)) {
      return rootProjPath.join('/');
    }
    rootProjPath.push(fileArr[i]);
  }

  // if a package.json file cannot be found, inform user and return null;
  vscode.window.showInformationMessage('A root folder was not found.');
  return null;
};

module.exports = getRootProjectDir;
