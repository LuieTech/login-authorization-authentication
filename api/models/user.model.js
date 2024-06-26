const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")


const schema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    avatar:{
      type: String
    }
    ,
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
  }, 
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        if(ret.avatar){
          ret.avatar = `http://localhost:3000/${ret.avatar.replace("public/", "")}`;
        }
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret
        
      }
    }
  }
  )

  schema.pre("save", function(next){
    if(this.isModified("password")){
      this.password = bcrypt.hash(this.password, 10)
        .then(hash => {
          this.password = hash;
          next();
        })
        .catch(error => next(error))
    } else {
        next();
    }
  })

  schema.methods.checkPassword = function (passwordToCheck) {
     return bcrypt.compare(passwordToCheck, this.password);
  };

  const User = mongoose.model("User", schema);

  module.exports = User;