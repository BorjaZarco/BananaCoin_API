const { createRouter } = require('../services/router')

module.exports.path = '/banana-coin'
module.exports.current = createRouter(require('./routes/current'))
module.exports.deprecated = createRouter(require('./routes/v1'))
module.exports.signIn = createRouter(require('../auth/router'))
