const repository = require('../../../services/repository')(__dirname, '../../db.json');
const { promisify } = require('../../../services/router');



module.exports.getAllBananas = promisify(async (req, res) => {
  const bananas = await repository.getAllRegistry();
  res.sendStatus(bananas);
})
module.exports.getAllBananas.verb = 'get'
module.exports.getAllBananas.path = '/'