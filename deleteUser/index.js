var AWS = require("aws-sdk");
var doc = require('dynamodb-doc');

AWS.config.loadFromPath('./config.json');

var awsClient = new AWS.DynamoDB();
var dynamo = new doc.DynamoDB(awsClient);

exports.handler = function (event, context) {

    // var uuid = event.uuid;
    var uuid = '020cbac7-28f4-41aa-9918-fe14324d95c8';

    var params = {
        TableName: 'users',
        Key: {
            uuid: uuid
        },
        ConditionExpression: "attribute_not_exists(Replies)",
        ReturnValues: "ALL_OLD"
    };

 	dynamo.deleteItem(params, function(err, data){
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