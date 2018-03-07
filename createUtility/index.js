var AWS = require("aws-sdk");
var doc = require('dynamodb-doc');
var uuid = require('node-uuid');

AWS.config.loadFromPath('./config.json');

var awsClient = new AWS.DynamoDB();
var dynamo = new doc.DynamoDB(awsClient);

exports.handler = function (event, context) {

    var uuid = uuid.v4();
    var created_at = new Date().getTime().toString();
    var updated_at = new Date().getTime().toString();
    
    var params = {
        TableName: 'utility',
        Item: {
            id: uuid,
            name: 'test',
            service_state: '1',
            service: '2',
            account_format: '1',
            created_at: created_at,
            updated_at: updated_at,
        }
    };
    
    dynamo.putItem(params, function (err, data) {
        if (err) {
            console.log(err); // an error occurred
            context.fail(err.message);
        }
        else {
            context.succeed(data);
        }
    });
    
};