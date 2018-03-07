var AWS = require("aws-sdk");
var doc = require('dynamodb-doc');
var bcrypt = require('bcrypt');

AWS.config.loadFromPath('./config.json');

var awsClient = new AWS.DynamoDB();
var dynamo = new doc.DynamoDB(awsClient);

exports.handler = function (event, context) {
    var email = "gg@32.com";
    var password = "test12333";
    
    var params = {
        TableName: 'users',
        FilterExpression: "email = :val",
        ExpressionAttributeValues: {
            ":val": email
        },
        ReturnConsumedCapacity: "TOTAL"
    };

    dynamo.scan(params, function (err, data) {

        if(!data.Items.length)
            context.fail("This email doesn't exist.");
        else
            var items = data.Items;

        for ( var i = 0; i < items.length; i++ ) {
            bcrypt.compare(password, items[i].password, function(err, res) {
                if(!res){
                    context.fail("Incorrect Password!");
                }else{
                    context.succeed(items[i]);    
                }                
            });
        }
    })

};