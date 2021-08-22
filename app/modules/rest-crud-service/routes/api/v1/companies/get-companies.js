const Router = require('express').Router;

module.exports = Router({ mergeParams: true }).get('/v1/companies', (req, res, next) => {
  try {
    req.db.company.findAll().then(companies => {
      res.status(200).json(companies);
    });
  } catch (err) {
    next(err);
  }
});
