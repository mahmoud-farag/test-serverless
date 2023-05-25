
const mongoose = require('mongoose');
const {getParamByKey, buildSSMParams,} = require('./buildSSMParams');

let connection = null;
  // const URL= `mongodb+srv://admin:TFSoc6ajDrn3M0J1@taskmanagerdb.rd2ff.mongodb.net/serverless?retryWrites=true&w=majority`;

const connect = async () => {

  return new Promise( async(resolve, reject) => {
  
    try {

      
      if (connection == null) {

        await buildSSMParams();
        const dbuserName = getParamByKey('DB_USER_NAME');
        const dbPassword = getParamByKey('DB_PASSWORD');
        const URL = _generateURL(dbuserName, dbPassword);

        console.log('dbuserName:::', dbuserName);
        console.log('dbpassword:::', dbPassword);
        console.log('URL:::', URL);

        connection = await mongoose.connect(URL, {
          serverSelectionTimeoutMS: 5000
        });

        // await connection.asPromise();
      }

      resolve(connection);
      
    } catch (err) {
      reject(err);
    }
  });
};


const getConnection = () => {

  if(connection) return connection;

  return null;
};


const _generateURL = (dbUserName, dbPassword)=> {

  return `mongodb+srv://${dbUserName}:${dbPassword}@taskmanagerdb.rd2ff.mongodb.net/serverless?retryWrites=true&w=majority`;
}


module.exports = {
  connect,
  getConnection,

}