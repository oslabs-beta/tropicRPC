// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// only for creating config file
const fs = require('fs');
const path = require('path');

const createConfigFileCb = require('./modules/createConfigFileCommand');

// // only for creating config file when file does not already exist
// // requiring in template contained in configTemplate.txt
// const configTemplate = require("./configTemplate.txt");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // ***** TEAM7 NOTES *****:

  // tropic needs the path to the project root folder to add the config file
  // also to find path of server?

  // VS Code command: Create Config File
  // User inputs path to server file as entry point
  // User inputs path to proto file
  // User inputs port or external URL that server is running on
  // In general, this config file will give the Tropic extension access to service methods/functions

  // vscode.commands.registerCommand: binds a command id to a handler function
  const createConfigFile = vscode.commands.registerCommand(
    'tropic.createConfigFile',
    createConfigFileCb
  );

  // push it to the subscriptions
  context.subscriptions.push(createConfigFile);

  let disposable = vscode.commands.registerCommand('tropic.helloWorld', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from Tropic!');
  });
  context.subscriptions.push(disposable);
}
