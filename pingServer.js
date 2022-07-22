// Ping server and port
var tcpp = require("tcp-ping")

const ipAddress = "211.218.233.101"
const port = "11000"

const args = process.argv.slice(2)

function interval() {
	let date_ob = new Date()
	let hours = date_ob.getHours()
	let minutes = date_ob.getMinutes()
	let seconds = date_ob.getSeconds()
	let currTime = hours + ":" + minutes + ":" + seconds

	if (args[0] != undefined && args[1] != undefined) {
		console.log(currTime + " - Pinging " + args[0] + "/" + args[1])
		tcpp.probe(args[0], args[1], function (err, available) {
			// When server is up, it returns true.
			available ? console.log("Server is up.") : console.log("Server is down!")
		})
	} else if (args[0] != undefined && args[1] == undefined) {
		console.log(currTime + " - Pinging " + args[0] + "/80")
		tcpp.probe(args[0], 80, function (err, available) {
			// When server is up, it returns true.
			available ? console.log("Server is up.") : console.log("Server is down!")
		})
	} else if (args[0] == undefined) {
		console.log(currTime + " - Pinging " + ipAddress + "/" + port)
		tcpp.probe(ipAddress, port, function (err, available) {
			// When server is up, it returns true.
			available ? console.log("Server is up.") : console.log("Server is down!")
		})
	}
}

setInterval(interval, args[2] * 1000 || 60000)
