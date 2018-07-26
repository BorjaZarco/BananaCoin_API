const express = require('express')
const bodyParser = require('body-parser')

const bananaCoin = require('./banana-coin')

const PORT = 1337
const app = express()

/** First server middlewares */
app.use(bodyParser.json())

const createVersion = () => {
  const v1 = exxpress.Router()
  const version = express.Router()

  v1.get('/', bananaCoin.deprecated)
  version.use(bananaCoin.path, v1)
  version.use((req, res) => res.redirect(302, req.url))

  return version
}

/** Current Routes */
app.use('/v1', createVersion)
app.use(bananaCoin.path, bananaCoin.current)

module.exports = function startup () {
  return app.listen(PORT, () => console.log(`
    Banana Coin 🍌

    Successful server startup
    Running at http://localhost:${PORT}
  `))
}
