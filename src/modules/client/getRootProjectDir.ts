/**
 * @author : Roseanne Damasco July 16, 2020
 * @function : get root directory path
 * @param : none
 * @returns : {string} root directory absolute path
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 */

import * as vscode from 'vscode';

const fs = require('fs');

const getRootProjectDir: Function = (): string => {
  const workspaceFolders: readonly vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
  const currOpenFile: vscode.TextEditor | undefined = vscode.window.activeTextEditor;
  // Confirm that a project is open
  if (workspaceFolders === undefined) {
    vscode.window.showInformationMessage('Please open a project.');
    return '';
  }
  // Confirm that a file is open
  if (currOpenFile === undefined) {
    vscode.window.showInformationMessage('Please open a file.');
    return '';
  }
  // Get the paths for the main folder and open file
  const currWorkspacePath: string = workspaceFolders[0].uri.fsPath;
  const currFilePath: string = currOpenFile.document.uri.fsPath;

  const workspaceArr: Array<string> = currWorkspacePath.split('/');
  const fileArr: Array<string> = currFilePath.split('/');

  // Traverse through folders between main folder and open file
  // return the folder path where package.json file exists
  let rootProjPath: Array<string> = workspaceArr;
  for (let i = rootProjPath.length; i < fileArr.length; i += 1) {
    const lookingFor: string = `${rootProjPath.join('/')}/package.json`;
    if (fs.existsSync(lookingFor)) {
      return rootProjPath.join('/');
    }
    rootProjPath.push(fileArr[i]);
  }

  // if a package.json file cannot be found, inform user and return null;
  vscode.window.showInformationMessage('A root folder was not found.');
  return '';
};

module.exports = getRootProjectDir;
