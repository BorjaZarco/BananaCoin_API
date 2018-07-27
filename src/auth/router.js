const fs = require('fs');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { promisify } = require('../services/router');



async function getUsers () {
    return JSON.parse(fs.readFileSync('./src/auth/users.json', 'utf8'));
}

// async function setUsers (users) {
//     fs.writeFileSync('./src/auth/users.json', users);
// }


module.exports.createUser = promisify(async (req, res) => {
    const users = await getUsers();
    const username = req.body.username;
    const password = md5(req.body.password)
    const idx = users.findIndex(user => user.username == username && user.password == password)
    if ( idx !== -1){
        const token =  jwt.sign(
            { 
                username: users[idx].username,
                exp: Date.now()/1000+30 
            }, 
            '1234',

        )
        return res.status(200).json(token);
    }
    return res.sendStatus(400);
  })
  
  module.exports.createUser.verb = 'post'
  module.exports.createUser.path = '/'