const Cap = require("cap").Cap
const decoders = require("cap").decoders
const PROTOCOL = decoders.PROTOCOL
const jschardet = require("jschardet")
const iconv = require("iconv-lite")

var c = new Cap()
var device = Cap.findDevice("192.168.200.100")
var filter = "src net 211.218.233 and ip and tcp"
var bufSize = 10 * 1024 * 1024
var buffer = Buffer.alloc(65535)
var linkType = c.open(device, filter, bufSize, buffer)

c.setMinBytes && c.setMinBytes(0)

// Every time a packet is received, this function is called.
c.on("packet", function (nbytes, trunc) {
	if (linkType === "ETHERNET") {
		var ret = decoders.Ethernet(buffer)

		if (ret.info.type === PROTOCOL.ETHERNET.IPV4) {
			ret = decoders.IPV4(buffer, ret.offset)
			let retRaw = ret

			if (ret.info.protocol === PROTOCOL.IP.TCP) {
				var datalen = ret.info.totallen - ret.hdrlen
				ret = decoders.TCP(buffer, ret.offset)
				datalen -= ret.hdrlen
				rcvStr = buffer.toString("utf8", ret.offset, ret.offset + datalen)

				// Current time
				let currDate = new Date()
				let hours = ("0" + currDate.getHours()).slice(-2)
				let minutes = ("0" + currDate.getMinutes()).slice(-2)
				let seconds = ("0" + currDate.getSeconds()).slice(-2)

				if (rcvStr.includes("F8")) {
					console.log(rcvStr)
				}

				// console.log(retRaw)
				// console.log(rcvStr.replace(/\u6F.*/g, ""))

				// console.log(jschardet.detect(ret.offset))
				// console.log(buffer.toString("utf8", datalen))

			} else if (ret.info.protocol === PROTOCOL.IP.UDP) {
				console.log("Received UDP")
			} else console.log("Unsupported IPv4 protocol: " + PROTOCOL.IP[ret.info.protocol])
		} else console.log("Unsupported Ethertype: " + PROTOCOL.ETHERNET[ret.info.type])
	}
})
