var BB1_PORT = 33333;
var BB2_PORT = 2223;
var BB3_PORT = 3334;
var BB4_PORT = 4446;
var BB5_PORT = 5557;

var BB1_listnerSocketID;
var BB2_listnerSocketID;
var BB3_listnerSocketID;
var BB4_listnerSocketID;
var BB5_listnerSocketID;

var edgePORT = 6666;

var HOST = '192.168.1.2';
var edge1 = '192.168.1.2';
var edge2 = '192.168.1.4';

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

function main() 
{

}


document.addEventListener('DOMContentLoaded', function ()
{
	//BeagleBone 1 Listner
	chrome.sockets.udp.create({}, function(bb1_listner)
	{
	
		BB1_listnerSocketID = bb1_listner.socketId;

		chrome.sockets.udp.bind(BB1_listnerSocketID, HOST, BB1_PORT, function (lb)
		{
			console.log("bb1 listner bound "+lb);
		});
	});


	//BeagleBone 2 Listner
	chrome.sockets.udp.create({}, function(bb2_listner)
	{
	
		BB2_listnerSocketID = bb2_listner.socketId;

		chrome.sockets.udp.bind(BB2_listnerSocketID, HOST, BB2_PORT, function (lb)
		{
			console.log("bb2 listner bound "+lb);
		});
	});


	//BeagleBone 3 Listner
	chrome.sockets.udp.create({}, function(bb3_listner)
	{
	
		BB3_listnerSocketID = bb3_listner.socketId;

		chrome.sockets.udp.bind(BB3_listnerSocketID, HOST, BB3_PORT, function (lb)
		{
			console.log("bb3 listner bound "+lb);
		});
	});


	//BeagleBone 4 Listner
	chrome.sockets.udp.create({}, function(bb4_listner)
	{
	
		BB4_listnerSocketID = bb4_listner.socketId;

		chrome.sockets.udp.bind(BB4_listnerSocketID, HOST, BB4_PORT, function (lb)
		{
			console.log("bb4 listner bound "+lb);
		});
	});


	//BeagleBone 5 Listner
	chrome.sockets.udp.create({}, function(bb5_listner)
	{
	
		BB5_listnerSocketID = bb5_listner.socketId;

		chrome.sockets.udp.bind(BB5_listnerSocketID, HOST, BB5_PORT, function (lb)
		{
			console.log("bb5 listner bound "+lb);
		});
	});

	chrome.sockets.udp.onReceive.addListener(function(recvd)
	{
		recerverSocket = recvd.socketId;
		var recvLen = ab2str(recvd.data).length;

		if(recerverSocket == BB1_listnerSocketID)
		{
			if(recvLen>=0 && recvLen<=10)
			{
				document.getElementById('ldr1value').value = recvLen;
			}
			else
				if(recvLen==11)
				{
					document.getElementById('tled1').disabled = false;
					document.getElementById('bled1').disabled = false;
					document.getElementById('ledblink1').disabled = false;
					document.getElementById('ldr1').disabled = false;
					document.getElementById('ldr1value').disabled = false;
					document.getElementById('ds1').src = "online.jpg";
				}
				else
					if(recvLen==12)
					{
						document.getElementById('tled1').disabled = true;
						document.getElementById('bled1').disabled = true;
						document.getElementById('ledblink1').disabled = true;
						document.getElementById('ldr1').disabled = true;
						document.getElementById('ldr1value').disabled = true;	
						document.getElementById('ds1').src = "offline.ico";
					}
		}
		else
			if(recerverSocket == BB2_listnerSocketID)
			{
				if(recvLen>=0 && recvLen<=10)
				{
					document.getElementById('ldr2value').value = recvLen;
				}
				else
					if(recvLen==11)
					{
						document.getElementById('tled2').disabled = false;
						document.getElementById('bled2').disabled = false;
						document.getElementById('ledblink2').disabled = false;
						document.getElementById('ldr2').disabled = false;
						document.getElementById('ldr2value').disabled = false;
						document.getElementById('ds2').src = "online.jpg";

					}
					else
						if(recvLen==12)
						{
							document.getElementById('tled2').disabled = true;
							document.getElementById('bled2').disabled = true;
							document.getElementById('ledblink2').disabled = true;
							document.getElementById('ldr2').disabled = true;
							document.getElementById('ldr2value').disabled = true;	
							document.getElementById('ds2').src = "offline.ico";
						}
			}
			else
				if(recerverSocket == BB3_listnerSocketID)
				{
					if(recvLen>=0 && recvLen<=10)
				{
					document.getElementById('ldr3value').value = recvLen;
				}
				else
					if(recvLen==11)
					{
						document.getElementById('tled3').disabled = false;
						document.getElementById('bled3').disabled = false;
						document.getElementById('ledblink3').disabled = false;
						document.getElementById('ldr3').disabled = false;
						document.getElementById('ldr3value').disabled = false;
						document.getElementById('ds3').src = "online.jpg";

					}
					else
						if(recvLen==12)
						{
							document.getElementById('tled3').disabled = true;
							document.getElementById('bled3').disabled = true;
							document.getElementById('ledblink3').disabled = true;
							document.getElementById('ldr3').disabled = true;
							document.getElementById('ldr3value').disabled = true;	
							document.getElementById('ds3').src = "offline.ico";
						}
				}
				else
					if(recerverSocket == BB4_listnerSocketID)
					{
						if(recvLen>=0 && recvLen<=10)
						{
							document.getElementById('ldr4value').value = recvLen;
						}
						else
							if(recvLen==11)
							{
								document.getElementById('tled4').disabled = false;
								document.getElementById('bled4').disabled = false;
								document.getElementById('ledblink4').disabled = false;
								document.getElementById('ldr4').disabled = false;
								document.getElementById('ldr4value').disabled = false;
								document.getElementById('ds4').src = "online.jpg";

							}
							else
								if(recvLen==12)
								{
									document.getElementById('tled4').disabled = true;
									document.getElementById('bled4').disabled = true;
									document.getElementById('ledblink4').disabled = true;
									document.getElementById('ldr4').disabled = true;
									document.getElementById('ldr4value').disabled = true;	
									document.getElementById('ds4').src = "offline.ico";
								}
					}
					else
						if(recerverSocket == BB5_listnerSocketID)
						{
							if(recvLen>=0 && recvLen<=10)
							{
								document.getElementById('ldr5value').value = recvLen;
							}
							else
								if(recvLen==11)
								{
									document.getElementById('tled5').disabled = false;
									document.getElementById('bled5').disabled = false;
									document.getElementById('ledblink5').disabled = false;
									document.getElementById('ldr5').disabled = false;
									document.getElementById('ldr5value').disabled = false;
									document.getElementById('ds5').src = "online.jpg";

								}
								else
									if(recvLen==12)
									{
										document.getElementById('tled5').disabled = true;
										document.getElementById('bled5').disabled = true;
										document.getElementById('ledblink5').disabled = true;
										document.getElementById('ldr5').disabled = true;
										document.getElementById('ldr5value').disabled = true;	
										document.getElementById('ds5').src = "offline.ico";

									}
						}
	});

	document.getElementById('tled1').addEventListener('click', function(){led(1)});
	document.getElementById('bled1').addEventListener('click', function(){blinkled(1)});
	document.getElementById('ldr1').addEventListener('click', function(){readldr(1)});

	document.getElementById('tled2').addEventListener('click', function(){led(2)});
	document.getElementById('bled2').addEventListener('click', function(){blinkled(2)});
	document.getElementById('ldr2').addEventListener('click', function(){readldr(2)});
	
	main();

});


function readldr(tgt)
{
	var target;

	switch(tgt)
	{
		case 1:
			target = edge1;
			break;

		case 2:
			target = edge2;
			break;
	}

	console.log("readldr : "+target);
	chrome.sockets.udp.create({}, function(sender)
	{
		var senderSocketId = sender.socketId;

		var buf = new ArrayBuffer(100);

		var x = str2ab("22");

		chrome.sockets.udp.bind(senderSocketId, HOST, 0, function (x)
		{
			console.log("sender bound");
		});

		chrome.sockets.udp.send(senderSocketId, x ,target, edgePORT, function(sendInfo)
		{
			console.log("sent " + x);
		});

		chrome.sockets.udp.close(senderSocketId, function ()
		{
			console.log("sender closed");
		});
	});

}


function led(tgt)
{

	var target;
	var currentS;
	var setS;

	switch(tgt)
	{
		case 1:
			target = edge1;
			currentS = document.getElementById('tled1').value;
	
			if(currentS == 'On')
			{
				setS = '1';
				document.getElementById('tled1').value = 'Off';
			}
			else
				if(currentS == 'Off')
				{
					setS = '0';
					document.getElementById('tled1').value = 'On';
				}
			break;

		case 2:
			target = edge2;

			currentS = document.getElementById('tled2').value;
	
			if(currentS == 'On')
			{
				setS = '1';
				document.getElementById('tled2').value = 'Off';
			}
			else
				if(currentS == 'Off')
				{
					setS = '0';
					document.getElementById('tled2').value = 'On';
				}

			break;
	}	

	console.log("led : "+target + " : " + currentS + " : " + setS);

	chrome.sockets.udp.create({}, function(sender)
	{
		var senderSocketId = sender.socketId;

		var buf = new ArrayBuffer(100);

		var x = str2ab(setS);

		chrome.sockets.udp.bind(senderSocketId, HOST, 0, function (x)
		{
			console.log("sender bound");
		});

		chrome.sockets.udp.send(senderSocketId, x ,target, edgePORT, function(sendInfo)
		{
			console.log("sent " + sendInfo.bytesSent);

		});

		chrome.sockets.udp.close(senderSocketId, function ()
		{
			console.log("sender closed");
		});
	});
}


function blinkled(tgt)
{
	var target;
	var rate;

	switch(tgt)
	{
		case 1:
			target = edge1;
			rate = document.getElementById('ledblink1').value;

			break;

		case 2:
			target = edge2;
			rate = document.getElementById('ledblink2').value;
			break;
	}
	
	console.log("blink : "+rate )

	console.log("rate : "+rate);
	chrome.sockets.udp.create({}, function(sender)
	{
		var senderSocketId = sender.socketId;

		var buf = new ArrayBuffer(100);

		var x = str2ab(rate);

		chrome.sockets.udp.bind(senderSocketId, HOST, 0, function (x)
		{
			console.log("sender bound");
		});

		chrome.sockets.udp.send(senderSocketId, x ,target, edgePORT, function(sendInfo)
		{
			console.log("sent " + sendInfo.bytesSent);
		});

		chrome.sockets.udp.close(senderSocketId, function ()
		{
			console.log("sender closed");
		});
	});	
}