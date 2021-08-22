const Router = require('express').Router;

module.exports = Router({ mergeParams: true }).post('/v1/adverts', (req, res, next) => {
  try {
    req.db.company
      .findOrCreate({
        where: { name: req.body.company },
      })
      .then(([company, created]) => {
        const advert = req.body;
        advert.companyId = company.id;
        req.db.advert.create(advert).then(advert => {
          res.status(201).json(advert);
        });
      });
  } catch (err) {
    next(err);
  }
});
