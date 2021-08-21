const Router = require('express').Router;

module.exports = Router({ mergeParams: true }).post('/ads', (req, res, next) => {
  try {
    req.db.company
      .findOrCreate({
        where: { name: req.body.company },
      })
      .then(([company, created]) => {
        const advert = req.body;
        advert.companyId = company.id;
        req.db.advert.create(advert).then(advert => {
          res.json(advert).status(201);
        });
      });
  } catch (err) {
    next(err);
  }
  console.log(req.body.company);
});
