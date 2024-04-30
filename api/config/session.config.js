const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

// console.log("This is the session secret", process.env.SESSION_SECRET)

module.exports.session = expressSession({
  secret: process.env.SESSION_SECRET || "",
  proxy: process.env.SESSION_SECURE === "true",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoose.connection._connectionString,
    ttl: 14 * 24 * 60 * 60, // 14 days expiration
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === "true",
  },
});
