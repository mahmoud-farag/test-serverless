const { User } = require('../models');
const { connect } = require('../utils');




module.exports.getuser = async (event, context) => {
  
 try {

  const {ID}= event;

  if(!ID) {

    return {
      statusCode: 400,
      body: JSON.stringify({
          message: "ID is required",
        })
        
    };
  }
  
  await connect();

  const user = await User.findById(ID);
 

  if(!user) {
    return {
      statusCode: 404,
      body: JSON.stringify({
          message: "User not found",
        })
        
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
        message: "getuser",
        user: user
      })
    }; 
  
 } catch (err) {
  // throw err;

  console.error(err);

  return {
    statusCode: 500,
    body: JSON.stringify({
        message: err.message || 'Something went wrong while fetching user.',
      })
      
  };
 }
};



