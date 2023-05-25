
const { User } = require('../models');
const { connect } = require('../utils');




module.exports.createUser = async (event, context) => {

 
  try {
    await connect().catch(err => {
      console.error('Connection Error: ', err);
      throw err;
    });
  
    // const User = connection.model('User', userSchema);
  
    const {name, age, title , salary} = event;

  const user = await User.create({ name, age, title, salary}).catch(err => {
      console.error('saving new user err: ', err);
      throw err;
    });

  
    return {
      statusCode: 200,
      body: JSON.stringify({
          message: "user Created successfully",
          user: user
          
        })
        
    };

  } catch(err) {
    throw err;
  }
 
};



