import * as vscode from 'vscode';

// save listener, terminal, and output channel are declared globally within this file,
// to be accessible by activate and deactivate functions
let saveListener: vscode.Disposable;
let serverTerminal: vscode.Terminal;
const tropicChannel = vscode.window.createOutputChannel('Tropic');

// require in necessary files/modules
const fs = require('fs');
const path = require('path');
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

  // start up user's server, if server path was provided
  delete require.cache[tropicConfigPath];
  const { config } = require(tropicConfigPath);
  const serverPath = path.resolve(rootDir, config.entry);
  if (config.entry) {
    // confirm that the serverPath leads to a valid file
    if (fs.existsSync(serverPath)) {
      serverTerminal = vscode.window.createTerminal();
      serverTerminal.sendText(`node ${serverPath}`, true);
      vscode.window.showInformationMessage('gRPC server has been started.');
    } else {
      vscode.window.showInformationMessage(
        'Error in server path. Server was not started by Tropic.'
      );
    }
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

  // close opened server, by disposing terminal
  if (serverTerminal) {
    serverTerminal.dispose();
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
