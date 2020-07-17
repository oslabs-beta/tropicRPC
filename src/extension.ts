// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// only for creating config file
const fs = require('fs');
const path = require('path');

const createConfigFileCb = require('./modules/createConfigFileCommand');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  /**************************************************************
   * Command: Create configuration file in the user's project
   **************************************************************/
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
