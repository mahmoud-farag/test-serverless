
const { User } = require('../models');
const { connect } = require('../utils');



module.exports.updateUser = async (event, context) => {


  try {
    const { ID , newFileds} = event;

    await connect();

    await User.findOneAndUpdate({_id: ID}, newFileds);


  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
          message: "updateUser",
          
        })
        
    };
  }
};



