node-red-contrib-chatwork
=========================


### install
```
cd <node-red root>
npm install node-red-contrib-chatwork
```

### development
```
git clone <github node-red-contrib-chatwork>
cd node-red-contrib-chatwork
npm install

cd <node-red root>
npm install <git clone node-red-contrib-chatwork>
node-red 
```

### sample node
```
[{"id":"cf72f858.29e668","type":"tab","label":"フロー 1","disabled":false,"info":""},{"id":"77142a55.ae40b4","type":"Chatwork","z":"cf72f858.29e668","token":"","channelId":"","x":260,"y":80,"wires":[]},{"id":"2952c7f4.54a6c8","type":"inject","z":"cf72f858.29e668","name":"test","topic":"","payload":"test message","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":90,"y":80,"wires":[["77142a55.ae40b4","ab47be40.7ec8f"]]},{"id":"ab47be40.7ec8f","type":"debug","z":"cf72f858.29e668","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","x":270,"y":120,"wires":[]}]
```

