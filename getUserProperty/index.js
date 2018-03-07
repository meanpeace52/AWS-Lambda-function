var AWS = require("aws-sdk");
var doc = require('dynamodb-doc');

AWS.config.loadFromPath('./config.json');

var awsClient = new AWS.DynamoDB();
var dynamo = new doc.DynamoDB(awsClient);

exports.handler = function (event, context) {

    // var uuid = event.uuid;
    var puid = '';

    var params = {
        TableName: 'user_property',
        Key: {
            puid: puid
        }
    };

 	dynamo.getItem(params, function(err, data){
    	if (err) {
    		console.log(err); // an error occurred
    		context.fail(err.message);
    	}
    	else {
    		console.log(data); // successful response
    		context.succeed(data);
    	}
    });
    
};