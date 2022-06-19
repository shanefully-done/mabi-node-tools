// Check if Client.exe is running. If a match is found, return its PID, path, cmd and etc.
const find = require("find-process")

const processName = "Client.exe"

find("name", processName, true).then(function (list) {
	if (list.length == 0) {
		console.log("%s is down!", processName)
	} else {
		console.log("%s is up.", processName)
		// Log 
		console.log(list)
	}
})
