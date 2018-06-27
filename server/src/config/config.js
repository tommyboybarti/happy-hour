// The path module provides utilities for working with file and directory paths
const path = require('path')

// config that sets the port and an attribute db that contains all the seq related configurations
module.exports = {
// In many environments (e.g. Heroku), and as a convention, you can set the environment variable PORT to tell your web server what port to listen on.
  port: process.env.PORT || 8081,
  db: {
    // load in environment variables OR a fallback to happy-hour (name of db)
    database: process.env.DB_NAME || 'happy-hour',
    user: process.env.DB_USER || 'happy-hour',
    password: process.env.DB_PASS || 'happy-hour',
    options: {
      // tell seq what kind of db you are connecting to -> sqlite is a local SQL db
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      // where to store the db CHECK THE DAMN FILE PATH!!!
      // The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
      storage: path.resolve(__dirname, '../../happy-hour.sqlite'),
      // getting rid of warning about deprecated String based operators..
      operatorsAliases: false
    }
  },
  // identification of jwt (tokens)
  authentication: {
    // secret string only known to server to check whether jwtoken is valid or not
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
