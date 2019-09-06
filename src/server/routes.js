module.exports = (app, db) => {

  const food = require('./controllers/food')(db);
  console.log("im inside route")
  app.get('/food', food.getAll);
  app.get('/action', food.getAllAction);

};