var AWS = require("aws-sdk");
var doc = require('dynamodb-doc');
var uuid = require('node-uuid');
var bcrypt = require('bcrypt');
const saltRounds = 10;

AWS.config.loadFromPath('./config.json');

var awsClient = new AWS.DynamoDB();
var dynamo = new doc.DynamoDB(awsClient);

exports.handler = function (event, context) {

    var user_uuid = uuid.v4();
    var property_id = uuid.v4();
    // var password = event.password;
    var password = "test123";

    var created_at = new Date().getTime().toString();
    var updated_at = new Date().getTime().toString();

    bcrypt.hash(password, saltRounds, function (err, hash) {

        // var params = {
        //     TableName: 'users',
        //     Item: {
        //         uuid: user_uuid,
        //         email: event.email,
        //         password: hash,
        //         username: event.username,
        //         birth_date: event.birth_date,
        //         firstname: event.firstname,
        //         lastname: event.lastname,
        //         gender: event.gender,
        //         phone: event.phone,
        //         social_accounts: event.social_accounts,
        //         thumbnail_picture: event.thumbnail_picture,
        //         picture: event.picture,
        //         property_id: property_id,
        //         created_at: created_at,
        //         updated_at: updated_at,
        //     }
        // };

        var params = {
            TableName: 'users',
            Item: {
                uuid: user_uuid,
                email: "marcin.kazimir52@gmail.com",
                password: hash,
                username: "marcin123",
                birth_date: "xxxx-xx-xx",
                firstname: "marcin",
                lastname: "123",
                gender: "1",
                phone: "123123",
                social_accounts: ["FB", "Twitter"],
                thumbnail_picture: "aa",
                picture: "bb",
                property_id: property_id,
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
    });   
    
};