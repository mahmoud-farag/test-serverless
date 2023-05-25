const params = {};


const setParams = (newParam) => {
  params =  {...params, ...newParam}
};

const getParam = (keyStr) => {

  return params[keyStr];
};

const clearParams =  () => {
  params = {};
};


module.exports = {
  setParams,
  getParam,
  clearParams,
}

