/*  main.c  - main */

#include <xinu.h>
#include <stddef.h>

process	main(void)
{
	
	int32	timeout	= 20; //in ms
	int32	reg_slot1;
	int32	reg_slot2;
	int 	message_length;
	int32	remoteReceive = 7777;
	int32	remoteSend = 6666;
	/* Run the Xinu shell */

	recvclr();
	uint32 remoteip;

	dot2ip("192.168.1.2", &remoteip);
	
	reg_slot1 = udp_register(remoteip, remoteReceive, 52740);
	printf("slot registered : %d\n", reg_slot1);

	reg_slot2 = udp_register(remoteip, remoteSend, 52741);
	printf("slot registered : %d\n", reg_slot2);

	lread(1);
	
	while(TRUE)
	{
		char	inputbuf[1500];
		
		message_length = udp_recv(reg_slot1, inputbuf, sizeof(inputbuf), timeout);

		if(strncmp(inputbuf,"on",2) == 0 || strncmp(inputbuf,"off",3) == 0)
		{
			lwrite(0,inputbuf);
		}
		else
			if(strncmp(inputbuf,"read",4) == 0)
			{
				uint32 analog;
				uint32 digital;

				char z[1];
				char o[1];
				
				digital = lread(0);
				analog = lread(1);

				printf("digital : %s\n",digital);
				printf("analog : %s\n",analog);

				sprintf(z,"%d",digital);

				sprintf(o,"%d",analog);
		
				printf("digital : %s\n",z);
				printf("analog : %s\n",o);
				int32 mslen;
				int32 msle;

				mslen = strnlen(z, 1200);
				msle = strnlen(o, 1200);

				udp_send(reg_slot2,z,1);

				udp_send(reg_slot2,o,1);

			}
	}
}