const getId = require('./get-id');
const repository = require('../../../services/repository')(__dirname, '../../db.json');
const { promisify } = require('../../../services/router');
const makeResponse = require('./make-response');
const checkErrorsOnCreate = require('./check-errors-create');
const {chunk} = require('lodash');


module.exports.getAllBananas = promisify(async (req, res) => {
  let size = parseInt(req.query.size);
  let npage = parseInt(req.query.page);
  if (!npage) {
    npage = 1;
  }
  if (!size) {
    size = 10;
  }
  const bananas = await repository.getAllRegistry();
  const chunkBananas = chunk( bananas, size );
  res.status(200).json(makeResponse(chunkBananas, req, npage));
})
module.exports.getAllBananas.verb = 'get'
module.exports.getAllBananas.path = '/'



module.exports.getBanana = promisify(async (req, res) => {
  const bananas = await repository.getAllRegistry();
  res.status(200).json(makeResponse(bananas[bananas.findIndex(banana => banana.id === req.params.id)]), req);
})
module.exports.getBanana.verb = 'get'
module.exports.getBanana.path = '/:id'



module.exports.createBanana = promisify(async (req, res) => {
  const bananas = await  repository.getAllRegistry();
  const errors = checkErrorsOnCreate(req.body);
  if (errors.length != 0) {
    bananas.push({ id: getId(), status: req.body.status, value: req.body.value, created_at: Date.now().toString() });
    await repository.saveAllRegistry(req.body.id, bananas);
    res.status(200).json(makeResponse(req.body, req));
  } else {
    res.status(400).json(errors);
  }
})

module.exports.createBanana.verb = 'post'
module.exports.createBanana.path = '/'



module.exports.deleteBanana = promisify(async (req, res) => {
  const bananas = await repository.getAllRegistry();
  const idxToDelete = bananas.findIndex(banana => banana.id === req.params.id);
  if (idxToDelete !== -1) {
    const deletedBanana = bananas.splice(bananas.findIndex(banana => banana.id === req.params.id),1);
    await repository.saveAllRegistry(req.params.id, bananas);
    res.status(200).json(makeResponse(deletedBanana), req);
  } else {
    return res.status(404).json("Banana not found");
  }
})

module.exports.deleteBanana.verb = 'delete'
module.exports.deleteBanana.path = '/:id'



module.exports.putBanana = promisify(async (req, res) => {
  const bananas = await repository.getAllRegistry();
  bananas[bananas.findIndex(banana => banana.id === req.params.id)] = req.body;
  await repository.saveAllRegistry(req.params.id, bananas);
  res.status(200).json(makeResponse(bananas[bananas.findIndex(banana => banana.id === req.params.id)]), req);
})

module.exports.putBanana.verb = 'put'
module.exports.putBanana.path = '/:id'

module.exports.patchBanana = promisify(async (req, res) => {
  const bananas = await repository.getAllRegistry();
  const idx = bananas.findIndex(banana => banana.id === req.params.id);
  if (idx === -1) {
    return res.status(404).send("Banana not found");
  }
  const bananaToModify = bananas[idx];
  const modifiedBanana = req.body;
  if (modifiedBanana.id) {
    bananaToModify.id = modifiedBanana.id;
  }
  if (modifiedBanana.status) {
    bananaToModify.status = modifiedBanana.status;
  }
  if (modifiedBanana.value) {
    bananaToModify.value = modifiedBanana.value;
  }
  if (modifiedBanana.created_at) {
    bananaToModify.created_at = modifiedBanana.created_at;
  }
  await repository.saveAllRegistry(req.params.id, bananas);
  res.status(200).json(makeResponse(bananas[bananas.findIndex(banana => banana.id === req.params.id)]), req);
})

module.exports.patchBanana.verb = 'patch'
module.exports.patchBanana.path = '/:id'
