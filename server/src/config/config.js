// config that sets the port and an attribute db that contains all the seq related configurations
module.exports = {
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
      storage: './happy-hour.sqlite',
      // getting rid of warning about deprecated String based operators..
      operatorsAliases: false
    }
  },
  // identification of jwt (tokens)
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
