
import * as AWS from "aws-sdk"

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {

    const { id } = event.queryStringParameters
    const user = await dynamoDbClient.get({ TableName: USERS_TABLE, Key: { id } }).promise()

    return { statusCode: 200, body: JSON.stringify(user) }
}
