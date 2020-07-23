import * as vscode from 'vscode';

// save listener and output channel are declared globally within this file,
// to be accessible by activate and deactivate functions
let saveListener: vscode.Disposable;
const tropicChannel = vscode.window.createOutputChannel('Tropic');

// require in necessary files/modules
const fs = require('fs');
const getRootProjectDir = require('../client/getRootProjectDir');
const onSaveCb = require('../client/onSaveCb');

const activateTropicCb = () => {
  // create variable to reference root path of user's project
  const rootDir = getRootProjectDir();
  // create variable to reference config file path
  const tropicConfigPath = `${rootDir}/.tropic.config.js`;

  // if config file does not exist in file system, display message instructing user to create config file
  if (!fs.existsSync(tropicConfigPath)) {
    vscode.window.showInformationMessage('Please create a config file.');
    // exit function
    return null;
  }

  // open the output channel
  // focus on output channel and clear off any previous responses
  tropicChannel.show(true);
  tropicChannel.clear();
  tropicChannel.append(
    'Tropic is active. \nAdd requests to config file and save to view responses.'
  );

  // start listening for saves
  // saveListener invokes onSaveCb
  // logic for sending gRPC request goes inside onSaveCb
  saveListener = vscode.workspace.onDidSaveTextDocument((document) => {
    onSaveCb(document, tropicChannel, tropicConfigPath, rootDir);
  });
  // exit function
  return null;
};

const deactivateTropicCb = () => {
  // dispose of saveListener
  if (saveListener) {
    saveListener.dispose();
  }
  vscode.window.showInformationMessage(`Tropic is deactivated`);

  // hide and clear Tropic output channel
  tropicChannel.hide();
  tropicChannel.clear();
  // exit function
  return null;
};

// export functions to extension.ts
module.exports = { activateTropicCb, deactivateTropicCb };
