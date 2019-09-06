
module.exports = (dbPoolInstance) => {

  let getAll = (callback) => {
    dbPoolInstance.query('SELECT * from hotpot', (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        callback(null, queryResult.rows)
      }
    });
  };
  let getAllAction = (callback) => {
    dbPoolInstance.query('SELECT * from action', (error, queryResult) => {
      if( error ){
        callback(error, null);
      }else{
        callback(null, queryResult.rows)
      }
    });
  };

  return {
    getAllAction,
    getAll
  };
};