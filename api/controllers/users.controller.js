const User = require("../models/user.model")


module.exports.create = (req, res, nect) => {

  User.create({

    email: req.body.email,
    password: req.body.password

  })
    .then(user => res.status(201).json(user))
    .catch(error => next(error))

}

module.exports.login = (req, res, next) => {

  // console.log("This is the req session data",req.session)
  // console.log("This is the req.body data",req.body)

  User.findOne({email: req.body.email})
    .then(user => {
      if(user){
        user.checkPassword(req.body.password)
          .then(match => {
            if(match){
              req.session.userId = user.id
              res.json(user)
            }
            else {
              res.status(401).json({ 
                error: "unauthorized"
              })
            }
          })
      } else {
        res.status(401).json({ 
          error: "unauthorized"
        })
      }
    })
    .catch(error => next(error))

}