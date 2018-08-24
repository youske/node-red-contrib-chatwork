'use strict';

module.exports = function(RED) {
    const moment = require('moment');
    const request = require('request-promise');
    const endpoint =  "https://api.chatwork.com/v2";

    function chatworkNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;
        var credentials = RED.nodes.getCredentials(n.id);
    }
    RED.nodes.registerType('chatwork', chatworkNode, {
        credentials: {
          apitoken: { type: 'password' }
        }
    });
    
    function chatworkContactNode(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.chatwork = n.chatwork;
        this.chatworkConfig = RED.nodes.getNode(this.chatwork);
        if (this.chatworkConfig) {
            var node = this;
            var credentials = RED.nodes.getCredentials(this.chatwork);
            this.on('input', function(msg) {
                
 
                var options = {
                    url: endpoint + '/contacts',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-ChatWorkToken': credentials.apitoken
                    },
                    //form:{ 'body': (typeof msg.payload == 'object') ? JSON.stringify(msg.payload) : msg.payload },
                    json: true
                };
                request(options, function(err, res, body) {
                    console.log(body);
                    if (err) {
                        node.error(err);
                        node.status({fill:"red", shape:"ring", text:"chatwork send failed"});
                    } else {
                        msg.payload = body
                        node.send(msg);
                        node.status({});
                    }
                });
                
                
                
            });

        } else {
            this.error('missing chatwork configuration');
            this.status({fill:"red", shape:"ring", text:"not found chatwork config"});
        }
    }
    RED.nodes.registerType("chatwork contacts", chatworkContactNode);



    function chatworkTasksNode(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.chatwork = n.chatwork;
        this.channelId = n.channelId;
        this.limit = n.limit;
        this.to = n.to;
        
        this.chatworkConfig = RED.nodes.getNode(this.chatwork);
        if (this.chatworkConfig) {
            var node = this;
            var credentials = RED.nodes.getCredentials(this.chatwork);
            this.on('input', function(msg) {
 
                var options = {
                    url: endpoint + '/rooms' + '/' + node.channelId + '/tasks',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-ChatWorkToken': credentials.apitoken
                    },
                    form:{
                        'body': (typeof msg.payload == 'object') ? JSON.stringify(msg.payload) : msg.payload ,
                        "to_ids": "725384"
                        //'limit': moment().unix()
                    },
                    json: true
                };
                request(options, function(err, res, body) {
                    console.log(body);
                    if (err) {
                        node.error(err);
                        node.status({fill:"red", shape:"ring", text:"chatwork send failed"});
                    } else {
                        msg.payload = body
                        node.send(msg);
                        node.status({});
                    }
                });

 
 
            });


        } else {
            this.error('missing chatwork configuration');
            this.status({fill:"red", shape:"ring", text:"not found chatwork config"});
        }
    }
    RED.nodes.registerType("chatwork tasks", chatworkTasksNode);



    function chatworkFilesNode(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.chatwork = n.chatwork;
        this.channelId = n.channelId;
        this.url = n.url;        
        this.chatworkConfig = RED.nodes.getNode(this.chatwork);
        if (this.chatworkConfig) {
            var node = this;
            var credentials = RED.nodes.getCredentials(this.chatwork);
            this.on('input', function(msg) {
 
                var options = {
                    url: endpoint + '/rooms' + '/' + node.channelId + '/files' ,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-ChatWorkToken': credentials.apitoken
                    },
                    form:{ 'body': (typeof msg.payload == 'object') ? JSON.stringify(msg.payload) : msg.payload },
                    json: true
                };
                request(options, function(err, res, body) {
                    console.log(body);
                    if (err) {
                        node.error(err);
                        node.status({fill:"red", shape:"ring", text:"chatwork send failed"});
                    } else {
                        msg.payload = body
                        node.send(msg);
                        node.status({});
                    }
                });

 
 
            });


        } else {
            this.error('missing chatwork configuration');
            this.status({fill:"red", shape:"ring", text:"not found chatwork config"});
        }
    }
    RED.nodes.registerType("chatwork files", chatworkFilesNode);




    function chatworkOutNode(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.chatwork = n.chatwork;
        this.channelId = n.channelId;
        this.chatworkConfig = RED.nodes.getNode(this.chatwork);
        
        if (this.chatworkConfig) {
            var node = this;
            var credentials = RED.nodes.getCredentials(this.chatwork);
            
            this.on('input', function(msg) {
                var options = {
                    url: endpoint + '/rooms/' + node.channelId + '/messages',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-ChatWorkToken': credentials.apitoken
                    },
                    form:{ 'body': (typeof msg.payload == 'object') ? JSON.stringify(msg.payload) : msg.payload },
                    json: true
                };
                request(options, function(err, res, body) {
                    if (err) {
                        node.error(err);
                        node.status({fill:"red", shape:"ring", text:"chatwork send failed"});
                    } else {
                        node.status({});
                    }
                });

            });
        } else {
            this.error('missing chatwork configuration');
            this.status({fill:"red", shape:"ring", text:"not found chatwork config"});
        }
        
    }  
    RED.nodes.registerType("chatwork out", chatworkOutNode);

}