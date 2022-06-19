// Ping server and port
var tcpp = require("tcp-ping")

const ipAddress = "211.218.233.101"
const port ="11000"

tcpp.probe(ipAddress, port, function (err, available) {
	// When server is up, it returns true.
	available ? console.log("Login server is up.") : console.log("Login server is down!")
})
