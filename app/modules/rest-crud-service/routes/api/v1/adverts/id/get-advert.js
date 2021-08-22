const Router = require('express').Router;

module.exports = Router({ mergeParams: true }).get('/v1/adverts/:id', (req, res, next) => {
  const options = {
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'companyId'],
    },
    include: [
      {
        model: req.db.company,
        attributes: ['id', 'name'],
      },
    ],
  };

  try {
    req.db.advert.findByPk(req.params.id, options).then(advert => {
      if (advert) {
        res.status(200).json(advert);
      } else {
        res.sendStatus(404);
      }
    });
  } catch (err) {
    next(err);
  }
});
