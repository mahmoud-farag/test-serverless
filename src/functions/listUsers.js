const { User } = require('../models');
const { connect } = require('../utils');




module.exports.listUsers = async () => {


  await connect().catch(err => {
    console.error('Connection Error: ', err);
    throw err;
  });

  console.log('User----:::', User);
  
  // const User = connection.collection('users');
  
  const users = await User.find({});

  return {
    statusCode: 200,
    body: JSON.stringify({
        message: "listUsers",
        users: users,
      })
      
  };
};



