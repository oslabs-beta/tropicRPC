// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// only for creating config file
const fs = require("fs");
const path = require("path");

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
    "tropic.createConfigFile",
    () => {
      // check if root directory already has a tropic.config.js file
      const tropicConfigPath = `Users/koonchow/Codesmith/Projects/Tropic/src/tropic.config.js`; // `${rootPath}/tropic.createConfigFile.js`;
      // if the tropic.config.js file already exists, display message indicating the file already exists
      if (fs.existsSync(tropicConfigPath)) {
        vscode.window.showInformationMessage(
          `A Tropic configuration file already exists at ${tropicConfigPath}`
        );
        // exit out
        return null;
      }

      // const templateFile = fs.readFileSync(
      //   path.resolve(__dirname, "./configTemplate.txt"),
      //   "utf8"
      // );
      // console.log("templateFile", templateFile);
      // if tropic.config.js file does not already exist, write to a new file
      fs.writeFileSync(
        tropicConfigPath,
        // string from configTemplate.txt that will be used to populate the new file
        // templateFile,
        'module.exports = {\n  // change "./server/index.js" to the relative path from the root directory to\n  // the file that starts your server.\n  // if you\'re connecting to an external server,\n  // change "./server/index.js" to its URL in the following format:\n  // "https://yourserverurl.com"\n  entry: \'./server/index.js\',\n\n  // change 3000 to the port number that your server runs on\n  portNumber: 3000,\n\n  // to increase the amount of time allowed for the server to startup, add a time\n  // in milliseconds (integer) to the "serverStartupTimeAllowed"\n  // serverStartupTimeAllowed: 5000,\n};\n',
        "utf8"
      );

      // open the new file in VS Code
      vscode.workspace.openTextDocument(tropicConfigPath).then((doc) => {
        // apparently openTextDocument doesn't mean it's visible...
        vscode.window.showTextDocument(doc);
      });
    }
  );

  // push it to the subscriptions
  context.subscriptions.push(createConfigFile);

  let disposable = vscode.commands.registerCommand("tropic.helloWorld", () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from Tropic!");
  });
  context.subscriptions.push(disposable);
}
