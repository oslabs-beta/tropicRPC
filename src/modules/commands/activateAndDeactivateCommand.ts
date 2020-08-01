import * as vscode from 'vscode';
import { ChildProcess, spawn } from 'child_process';

// save listener, child process, and output channel are declared globally within this file,
// to be accessible by activate and deactivate functions
let saveListener: vscode.Disposable;
let serverProcess: ChildProcess;
let serverIsTurnedOn: boolean;
const tropicChannel = vscode.window.createOutputChannel('Tropic');

// require in necessary files/modules
const fs = require('fs');
const path = require('path');
const getRootProjectDir = require('../client/getRootProjectDir');
const onSaveCb = require('../client/onSaveCb');
const throttle = require('../client/throttleOnSave');

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
      // start the server with node
      serverProcess = spawn('node', [serverPath], { cwd: rootDir });
      serverIsTurnedOn = true;
      // if an error is reported, inform user
      serverProcess.stderr.on('data', (data) => {
        serverIsTurnedOn = false;
        vscode.window.showErrorMessage(
          `Error starting your gRPC server. Please try manually starting it.`
        );
      });

      // inform user that server is starting
      setTimeout(() => {
        if (serverIsTurnedOn) {
          vscode.window.showInformationMessage('gRPC server has been started.');
        }
      }, 2500);
    } else {
      vscode.window.showErrorMessage('Error in server path. Server was not started by Tropic.');
    }
  }

  // open the output channel
  // focus on output channel and clear off any previous responses
  tropicChannel.show(true);
  tropicChannel.clear();
  tropicChannel.append(
    'Tropic is active. \nAdd requests to config file and save to view responses.'
  );

  const throttleOnSave = throttle(onSaveCb, 2000);

  // start listening for saves
  // saveListener invokes onSaveCb
  // logic for sending gRPC request goes inside onSaveCb
  saveListener = vscode.workspace.onDidSaveTextDocument((document) => {
    throttleOnSave(document, tropicChannel, tropicConfigPath, rootDir);
  });
  // exit function
  return null;
};

const deactivateTropicCb = () => {
  // dispose of saveListener
  if (saveListener) {
    saveListener.dispose();
  }

  // close opened server
  if (serverIsTurnedOn) {
    console.log('at end: ', serverProcess.pid);
    const killServerProcess = spawn('kill', [serverProcess.pid]);
    setTimeout(() => killServerProcess.kill('SIGINT'), 500);
    serverIsTurnedOn = false;
    vscode.window.showInformationMessage(`gRPC server has been shut off.`);
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
