require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose")

require("./config/db.config");

const app = express();

app.use(express.json());
app.use(logger("dev"));

const sessionConfig = require("./config/session.config");
app.use(sessionConfig.session);

const routes = require("./config/routes.config");
app.use("/", routes);

app.use((req, res, next) => next( createError(404, 'route not found')))

app.use((error, req, res, next) => {

  if(error instanceof mongoose.Error.CastError && error.message.includes('_id')){
    error = createError(404, 'Resource not found');
  } else if(error instanceof mongoose.Error.ValidationError){
      error = createError(400, error);
  } else if(!error.status) {
    error = createError(500, error)
  }
    // console.log(error);

    let errors;
    if(error.errors){
      errors = Object.keys(error.errors)
        .reduce((errors, errorKey) => {
          errors[errorKey] = error.errors[errorKey].message || error.errors[errorKey];
          return errors;
      }, {}) 
    }
  
  const data = {
    message: error.message,
    errors: errors
  }
  res.status(error.status).json(data);

})

const PORT = process.env.PORT || "";

app.listen(PORT, () => {
  console.log(`Application running at port ${PORT}`)
});
