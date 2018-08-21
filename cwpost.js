var request = require('request');
var endpoint =  "https://api.chatwork.com/v2";

module.exports = function(RED) {

    function chatwork(n) {
        RED.nodes.createNode(this, n);
        this.channelId = n.channelId;
        this.token = n.token;
        var node = this;

        this.on('input', function(msg) {
            var payload = msg.payload;
            options = {
                url: endpoint + '/rooms/' + node.channelId + '/messages',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-ChatWorkToken': node.token
                },
                form:{ 'body': payload },
                json: true
            };
            request.post(options, function(err, res, body) { // HTTP POST
                if (err) {
                    node.error(err);
                    node.status({fill:"red", shape:"ring", text:"chatwork send failed"});
                } else {
                    node.status({});
                }
            });
        });
    }
    RED.nodes.registerType("Chatwork", chatwork);
}