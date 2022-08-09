
import * as uuid from 'uuid'
import * as AWS from "aws-sdk"
import { z } from "zod"

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();


const createSchema = z.object({
    name: z.string(),
    email: z.string()
})

module.exports.handler = async (event) => {
    try {
        const data = (typeof event.body == 'object') ? event.body : JSON.parse(event.body)
        createSchema.parse(data);
        const params = {
            id: uuid.v1(),
            name: data.name,
            email: data.email
        }
        await dynamoDbClient.put({ TableName: USERS_TABLE, Item: params }).promise()

        return { statusCode: 200, body: JSON.stringify(params) }
    } catch (error) {
        return { statusCode: 400, body: JSON.stringify(error) }
    }
}
