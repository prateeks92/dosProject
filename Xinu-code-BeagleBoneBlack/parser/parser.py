import xml.etree.ElementTree as ET

with open('../parser/Sample DDL.xml', 'rt') as f:
	tree = ET.parse(f)

for node in tree.iter():
	if node.attrib.get('name') == 'LDR_Digital':
		d_inputchip = node[1][0].text
		d_inputpin = node[1][1].text

	if node.attrib.get('name') == 'LDR_Analog':
		a_inputchip = node[1][0].text
		a_inputpin = node[1][1].text
		const = int(node[4][0].text)
		maxVA = float(node[4][1].text)
		maxVD = int(node[4][2].text)
	
	if node.attrib.get('name') == 'LED':
		outputchip = node[1][0].text
		outputpin = node[1][1].text

lux_const = (const * maxVD) / maxVA

with open('../device/lsensor/lread.c', 'w') as file:
	file.write("#include <xinu.h>\ndevcall lread(uint32 id) { \n	uint32 data; \n	switch(id) { \n		case 0: data = lsensor_read(" + d_inputchip + ", " + d_inputpin + "); \n				break; \n		case 1: data = lsensor_aread(" + a_inputpin + "); \n				lux = " + str(lux_const) + " / (" + str(maxVD) + " - data); \n				data = lux; \n				break; \n	} \n	return data; \n}")
	file.close()
	
with open('../device/lsensor/lwrite.c', 'w') as file:
	file.write("#include <xinu.h> \ndevcall lwrite(uint32 id, char* data) { \n	switch(id) { \n		case 0: lsensor_write(" + outputchip + ", " + outputpin + ", data); \n				break; \n	} \n	return OK; \n}")
	file.close()