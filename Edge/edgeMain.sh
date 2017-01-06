gnome-terminal -x node Edge.js

BBB1=0

while true ; do
    ping 192.168.1.3 -c 1 > /dev/null 2>&1 
    rc=$?
    if [[ $rc -eq 0 ]] ; then
    	if [[ $BBB1 -eq 0 ]] ; then
    		echo 'success'
    		node aliveStatus.js 11
    		BBB1=1
    	fi
    else
    	if [[ $BBB1 -eq 1 ]] ; then
    		echo 'not success'                      # If okay, flag to exit loop.
    		node aliveStatus.js 12
    		BBB1=0
    	fi
    fi
done