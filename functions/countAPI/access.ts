import * as countapi from 'countapi-js';

module.exports.handler = async () => {

    const result = await countapi.get('null', 'ton-challenge')
    console.log(result.value);
    return result

}
