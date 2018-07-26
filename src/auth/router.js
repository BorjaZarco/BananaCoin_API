const fs = require('fs');
const md5 = require('md5');
const { promisify } = require('../services/router');
const getId = require('../banana-coin/routes/current/get-id')



async function getUsers () {
    return JSON.parse(fs.readFileSync('./src/auth/users.json', 'utf8'));
}


module.exports.createUser = promisify(async (req, res) => {
    const users = await getUsers();
    const idx = users.findIndex(user => user.username == req.body.username && user.password == md5(req.body.password))
    if ( idx !== -1){
        return res.status(200).json(users[idx].token);
    }
    return res.sendStatus(400);
  })
  
  module.exports.createUser.verb = 'post'
  module.exports.createUser.path = '/'