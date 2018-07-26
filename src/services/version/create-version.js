const express = require('express')
const {getAllBananas} = require('../../banana-coin/routes/v1/index')

module.exports = function ( path ) {
    const v1 = express.Router()
    const version = express.Router()

    v1.get('/', getAllBananas)
    version.use(path, v1)
    version.use((req, res) => res.redirect(302, req.url))

    return version
}