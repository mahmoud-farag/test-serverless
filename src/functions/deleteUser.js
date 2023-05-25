
const { User } = require('../models');
const { connect } = require('../utils');


module.exports.deleteUser = async (event, context) => {

  try {
    const { ID } = event;

    if(!ID) {
      return {
        statusCode: 400,
        body: JSON.stringify({
            message: "ID is required.",
          })
      };
    }
  
    await connect().catch(err => {
      console.error('Connection Error: ', err);
      throw err;
    });
  
  
    await User.findByIdAndDelete(ID).catch(err => {
      console.error('Error while deleteing customer: ', err);
      throw err;
    });
  
    return {
      statusCode: 200,
      body: JSON.stringify({
          message: "customer successfully deleted",
          
        })
        
    };
    
  } catch (err) {

    console.error('Error while deleting user', err);

    return {
      statusCode: 400,
      body: JSON.stringify({
          message: err.message || 'Error while deleting user',
        })
    };
  }
};



