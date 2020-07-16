// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

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

  // VS Code command: Activate
  // Stretch: Tropic starts server for user
  // show output channel (make sure it's cleared)
  // parse through config file to grab user-provided data
  // if information is missing or not in the right format,
  //return error and instruct user to enter appropriate information

  // provide user with a 'tropic' function that they can use to call a function on their grpc server
  // include guidance on what user should input in request function
  // need to pass in an object that details the service, method, and a body

  // create on save listener
  // on save: clear output channel (in case user had any previously completed requests)
  // parse through the file looking for our function invocation
  // JSON.parse the string between () invocation call
  // if inaccurate/incomplete information provided in request, throw error message and instructions on resubmitting request
  // (maybe user didn't turn on server?  can instruct user to check that server is actually on)
  // invoke a grpc request with that info
  // parse through response
  // display result in output channel

  // VS Code command: De-activate
  // Turn off on save listener, so when user saves file, nothing happens
  // Stretch: End server, if we had opened it

  // ***** TEAM7 NOTES END HERE *****

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "tropic" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("tropic.helloWorld", () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from Tropic!");
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
