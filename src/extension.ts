import * as vscode from 'vscode';

const createConfigFileCb = require('./modules/commands/createConfigFileCommand');
const {
  activateTropicCb,
  deactivateTropicCb,
} = require('./modules/commands/activateAndDeactivateCommand');

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

  /**************************************************************
   * Command: Activate tropicRPC functionality
   **************************************************************/
  const activateTropic = vscode.commands.registerCommand('tropic.activateTropic', activateTropicCb);

  /**************************************************************
   * Command: Deactivate tropicRPC functionality
   **************************************************************/
  const deactivateTropic = vscode.commands.registerCommand(
    'tropic.deactivateTropic',
    deactivateTropicCb
  );

  context.subscriptions.push(createConfigFile, activateTropic, deactivateTropic);
}
