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
   * Command: Activate Tropic functionality
   **************************************************************/
  const activateTropic = vscode.commands.registerCommand(
    'tropic.activateTropic',
    () => {
      console.log('extension.ts'), activateTropicCb();
    }
  );

  /**************************************************************
   * Command: Deactivate save listener
   **************************************************************/
  const deactivateTropic = vscode.commands.registerCommand(
    'tropic.deactivateTropic',
    deactivateTropicCb
  );
  context.subscriptions.push(
    createConfigFile,
    activateTropic,
    deactivateTropic
  );

  let disposable = vscode.commands.registerCommand('tropic.helloWorld', () => {
    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World from Tropic!');
  });
  context.subscriptions.push(disposable);
}
