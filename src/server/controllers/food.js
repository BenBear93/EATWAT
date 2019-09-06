module.exports = (db) => {

  let getAll = (request, response) => {

      db.food.getAll((error, food) => {

        if (error) {

          console.error('error getting food', error);
          response.status(500);
          response.send('server error');

        } else {

            response.send(food);
        }
      });
  };
  let getAllAction = (request, response) => {

      db.food.getAllAction((error, action) => {

        if (error) {

          console.error('error getting food', error);
          response.status(500);
          response.send('server error');

        } else {

            response.send(action);
        }
      });
  };
  return {
    getAllAction: getAllAction,
    getAll : getAll

  }

};