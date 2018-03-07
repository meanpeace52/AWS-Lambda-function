var AWS = require("aws-sdk");
var doc = require('dynamodb-doc');

AWS.config.loadFromPath('./config.json');

var awsClient = new AWS.DynamoDB();
var dynamo = new doc.DynamoDB(awsClient);

exports.handler = function (event, context) {

    // var uuid = event.uuid;
    var uuid = '4c9f7f56-9cc9-4496-8b2c-0a054554b48c';

    var params = {
        TableName: 'users',
        Key: {
            uuid: uuid
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