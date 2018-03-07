var AWS = require("aws-sdk");
var doc = require('dynamodb-doc');

AWS.config.loadFromPath('./config.json');

var awsClient = new AWS.DynamoDB();
var dynamo = new doc.DynamoDB(awsClient);

exports.handler = function (event, context) {

    // var uuid = event.uuid;
    var id = '';

    var params = {
        TableName: 'utility',
        Key: {
            id: id
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