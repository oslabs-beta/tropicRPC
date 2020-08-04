/**
 * @author : Ed Chow, Joyce Lo, Shah Khan, Steve Canavan July 16, 2020
 * @function : creates config file
 * @param : none
 * @returns : null
 * @changelog : ##WHOEVER CHANGES THE FILE, date, details
 */

import * as vscode from 'vscode';

const fs = require('fs');
const path = require('path');
const getRootProjectDir = require('../client/getRootProjectDir');

const createConfigFile: Function = () => {
  const tropicConfigPath: string = `${getRootProjectDir()}/.tropicRPC.config.js`;

  // if the tropicRPC.config.js file already exists in the root directory
  // then display message indicating the file already exists
  if (fs.existsSync(tropicConfigPath)) {
    vscode.window.showInformationMessage(
      `A tropicRPC configuration file already exists at ${tropicConfigPath}`
    );

    // exit out
    return null;
  }

  // reading data from the config template
  // configTemplate file: make sure development file is in .ts format
  // it will be a .js file on client side, as indicated below
  const templateFile: string = fs.readFileSync(
    path.resolve(__dirname, './configTemplate.js'),
    'utf8'
  );

  // write template configuration file to new file on client side
  fs.writeFileSync(tropicConfigPath, templateFile, 'utf8');

  // open new file in VS Code
  vscode.workspace.openTextDocument(tropicConfigPath).then((doc: vscode.TextDocument) => {
    // after opening new file, need to make it the focus
    vscode.window.showTextDocument(doc);
  });
};

module.exports = createConfigFile;
