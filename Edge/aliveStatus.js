var inp = process.argv[2];
console.log("inprgdf : "+inp);

var cloudPort = 33333;
var cloud = '192.168.1.2';
//var cloud = '192.168.1.2';

var dgram = require('dgram');

var client = dgram.createSocket('udp4');

function decodeArg(argIn)
{
	return Buffer(argIn*2);
}

client.send(decodeArg(inp), cloudPort, cloud, function(err, bytes) {
    if (err) throw err;
   // console.log('UDP message sent to ' + HOST +':'+ PORT);
    client.close();
});
