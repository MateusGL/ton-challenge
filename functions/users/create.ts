
import * as uuid from 'uuid'
import * as AWS from "aws-sdk"

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event) => {
    const data = (typeof event.body == 'object') ? event.body : JSON.parse(event.body)
    const params = {
        id: uuid.v1(),
        name: data.name,
        email: data.email
    }
    await dynamoDbClient.put({ TableName: USERS_TABLE, Item: params }).promise()

    return { statusCode: 200, body: JSON.stringify(params) }
}
