const { createRouter } = require('../services/router')

module.exports.path = '/banana-coin'
module.exports.current = createRouter(require('./routes'))
module.exports.deprecated = createRouter(require('./v1'))
