const {SSMClient, GetParametersCommand} = require('@aws-sdk/client-ssm');


let paramters = {};



const buildSSMParams = async () => {

  try {
    console.log('debug 1')

    if (_isParamsEmpty(paramters)) {
      console.log('debug 4')

      console.log('process.env.accessKeyId::: ', process.env.accessKeyId);
      console.log('process.env.secretAccessKey::: ', process.env.secretAccessKey)
      const config = {
        region: 'us-east-1',
        credentials: {
          accessKeyId: process.env.accessKeyId,
          secretAccessKey: process.env.secretAccessKey,
        }
  
      };
      console.log('debug 5')

      console.log('------------config------------------------');
      console.log(config);
  
      const client = new SSMClient(config);
  
  
      const input = {
        Names: ['DB_USER_NAME', 'DB_PASSWORD'],
        WithDecryption: true,
  
      };
  
      const command  = new GetParametersCommand(input);
  
      const response = await client.send(command);

      _buildKeyValuePairs(response.Parameters);
      
      console.log('---------params----------');
      console.log(paramters);
    }
    console.log('debug 10')

  } catch (err) {

    console.error('Something went wrong while building SSM parameters.');
    throw err;
  }
};

function getParamByKey (key) {

  return paramters[key] || null;
};


// PRIVATE METHODS

function _buildKeyValuePairs (parameters) {

  parameters = parameters || [];
  parameters.forEach(param => {
    paramters[param.Name] = param.Value;
  });

};


function _isParamsEmpty (params) {
  console.log('debug 2')

  if(Object.keys(params).length === 0) return true;
  console.log('debug 3')

  return false;
};




module.exports = {
  getParamByKey,
  buildSSMParams,
}