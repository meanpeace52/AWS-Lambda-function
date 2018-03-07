var AWS = require("aws-sdk");
var doc = require('dynamodb-doc');
var uuid = require('node-uuid');

AWS.config.loadFromPath('./config.json');

var awsClient = new AWS.DynamoDB();
var dynamo = new doc.DynamoDB(awsClient);

exports.handler = function (event, context) {
    var property_id = uuid.v4();
    var created_at = new Date().getTime().toString();
    var updated_at = new Date().getTime().toString();  

    var cognito_params = {
        UserAttributes: [ /* required */
            {
                Name: 'nickname', /* required */
                Value: property_id
            },
            /* more items */
        ],
        UserPoolId: 'us-east-1_2vkZSK2Iz', /* required */
        Username: event.userName
    };
    
    console.log(event.userName);

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
    cognitoidentityserviceprovider.adminUpdateUserAttributes(cognito_params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });

    var params = {
        TableName: 'user_property',
        Item: {
            puid: property_id,            
            created_at: created_at,
            updated_at: updated_at,
        }
    };
  
    dynamo.putItem(params, function (err, data) {
        if (err) {
            console.log(err); // an error occurred
            // context.fail(err.message);
            context.done(null, event);
        }
        else {
            context.done(null, event);
        }
    });
};