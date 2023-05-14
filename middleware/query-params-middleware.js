module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  }

  delete req.query._id;

  req.query._skip = (req.query._page - 1) * req.query._limit;
  req.query._limit = req.query._limit;

  next();
};
