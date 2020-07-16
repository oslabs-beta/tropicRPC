const path = require("path");
const fs = require("fs");

const templateFile = fs.readFileSync(
  path.resolve(__dirname, "./configTemplate.txt"),
  "utf-8"
);
console.log("templateFile", templateFile);

const tropicConfigPath = `Users/koonchow/Codesmith/Projects/Tropic/src/tropic.createConfigFile.js`;

fs.writeFileSync(
  tropicConfigPath,
  // string from configTemplate.txt that will be used to populate the new file
  "templateFile",
  // 'module.exports = {\n  // change "./server/index.js" to the relative path from the root directory to\n  // the file that starts your server.\n  // if you\'re connecting to an external server,\n  // change "./server/index.js" to its URL in the following format:\n  // "https://yourserverurl.com"\n  entry: \'./server/index.js\',\n\n  // change 3000 to the port number that your server runs on\n  portNumber: 3000,\n\n  // to increase the amount of time allowed for the server to startup, add a time\n  // in milliseconds (integer) to the "serverStartupTimeAllowed"\n  // serverStartupTimeAllowed: 5000,\n};\n',
  "utf-8"
);
