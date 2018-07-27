const express = require('express')
const helmet = require('helmet')
const errorhandler = require('errorhandler')
const createVersion = require('./services/version/create-version')
const bodyParser = require('body-parser')
const bananaCoin = require('./banana-coin')
const checkAPIToken = require('./auth/authentication')
const checkSetContentType = require('./services/security/check-set-content')
const checkLogged = require('./auth/authorization')

const PORT = 1337
const app = express()

/** First server middlewares */
app.use(bodyParser.json())
// app.use(errorhandler)
app.use(helmet())
app.use(checkAPIToken)
app.use(checkSetContentType);



/** Current Routes */
app.use('/sign-in', bananaCoin.signIn)
app.use('/v1', checkLogged, createVersion(bananaCoin.path))
app.use(bananaCoin.path, checkLogged, bananaCoin.current)

module.exports = function startup () {
  return app.listen(PORT, () => console.log(`
    Banana Coin 🍌

    Successful server startup
    Running at http://localhost:${PORT}
  `))
}
