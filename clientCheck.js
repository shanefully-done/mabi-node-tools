// Check if Client.exe is running. If a match is found, return its PID, path, cmd and etc.
const find = require("find-process")

console.log("Check Client started!")

find("name", "Client.exe", true).then(function (list) {
	if (list.length == 0) {
		console.log("Client is down!")
	} else {
		console.log("Client is up.")
		// Log 
		console.log(list)
	}
})
