const cors = require('cors')

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '*')
  .split(',')
  .map(origin => origin.trim())

module.exports = cors({
  origin: function(origin, next){

    if(!origin || allowedOrigins.includes(origin)){
      next(null, true)
    } else {
      
      next(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
});

// SECOND version cors:
// const cors = require('cors');

// const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim());

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true  // This is important for sessions or cookies to work across domains
// };

// module.exports = cors(corsOptions);

// THIRD version cors
// app.use(cors({ origin: '*', credentials: true }));

