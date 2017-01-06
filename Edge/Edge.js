var rPort = 52740;
var cloudPort = 33333;
var listenPORT = 6666;
var sendPORT = 7777;
/*
var os = require('os');

var interfaces = os.networkInterfaces();
var address = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}
*/
//console.log(String(address));

var HOST = '192.168.0.11';//String(address)//
var receiver = '192.168.1.3';
var cloud = '192.168.1.2';

var dgram = require('dgram');
var server = dgram.createSocket('udp4');


function ab2str(buf) 
{
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str)
{
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);

    for (var i=0, strLen=str.length; i<strLen; i++)
    {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}



server.bind(6666, HOST);

server.on('listening', function () 
{
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);

});

server.on('message', function (message, remote) 
{
    console.log(remote.address + ':' + remote.port +' - ' + message);
    var rec = parseInt(String(message)[0]+String(message)[2]);

    console.log(message + "  :  " + rec);
    if(remote.address != receiver)
    {
        console.log(rec);
        if(rec == 0 || rec == 1)
        {
            ledOnOff(rec);
        }
        else
            if(rec>=2 && rec<=12)
            {
                ledBlink(rec);
            }
            else
                if(rec==22)
                {
                    ldrRead();
                }
    }
    else
    {
        var ldrV = parseInt(message);
        var client = dgram.createSocket('udp4');
        var blen;

        if(ldrV<=70)
        {
            blen=1;
        }
        else
            if(70<ldrV && ldrV<=120)
                blen=2;
            else
                if(120<ldrV && ldrV<=200)
                    blen=3;
                else
                    if(200<ldrV && ldrV<=500)
                        blen=4;
                    else
                        if(500<ldrV && ldrV<=800)
                            blen=5;
                        else
                            if(800<ldrV && ldrV<=1200)
                                blen=6;
                            else
                                if(1200<ldrV && ldrV<=1500)
                                    blen=7;
                                else
                                    if(1500<ldrV && ldrV<=2000)
                                        blen=8;
                                    else
                                        if(2000<ldrV && ldrV<=2500)
                                            blen=9;
                                        else
                                            if(ldrV>2500)
                                                blen=10;
                                            
        client.send(decodeArg(blen), cloudPort, cloud, function(err, bytes) 
        {
            if (err) throw err;
            client.close();
        });

        console.log("sent  :  " + ldrV);
    }
});

function decodeArg(argIn)
{
    return Buffer(argIn*2);
}


function ldrRead()
{

    var client = dgram.createSocket('udp4');
    var setStat;
    client.bind(sendPORT,HOST);

    client.send("read", 0, "read".length, rPort, receiver, function(err, bytes) 
    {
        if (err) throw err;
    });

    client.send("stop", 0, "stop".length, rPort, receiver, function(err, bytes) 
    {
        if (err) throw err;
        client.close();
    });

}


function ledOnOff(stat)
{
    var client = dgram.createSocket('udp4');
    var setStat;
    client.bind(sendPORT,HOST);

    if(stat==0)
        setStat = "off";
    else
        if(stat==1)
            setStat="on";
    client.send(setStat, 0, setStat.length, rPort, receiver, function(err, bytes) 
    {
        if (err) throw err;
        client.close();
    });    
}


function ledBlink(brate)
{
    var interval = 300*(1/brate);
    console.log("interval : "+interval);
    var message = new Buffer('off');
    var x = 0;
    
    var interID = setInterval(function()
    {
        
        var client = dgram.createSocket('udp4');
        client.bind(sendPORT,HOST);

        if(message == "off")
        {
            message = "on";
        }
        else
            if(message == "on")
            {
                message = "off";
            }

        client.send(message, 0, message.length, rPort, receiver, function(err, bytes) 
        {
            if (err) throw err;
            client.close();
        });
        
        x+=1;
        
        if(x==30)
        {
            clearInterval(interID);// process.exit();
            return;
        }

    },interval);
    console.log("done");
}
