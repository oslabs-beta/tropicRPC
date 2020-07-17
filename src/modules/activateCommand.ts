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
