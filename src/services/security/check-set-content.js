module.exports = function(req, res, next) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    if (req.method !== 'GET' && req.method !== 'DELETE') {
      const contype = req.headers['content-type'];
      if (!contype || contype.indexOf('application/json') !== 0)
        return res.sendStatus(400);
    }
    next();
  }