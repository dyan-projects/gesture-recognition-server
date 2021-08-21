const Router = require('express').Router;

module.exports = Router({ mergeParams: true }).get('/ads', (req, res, next) => {
  try {
    req.db.advert
      .findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'companyId'],
        },
        include: [
          {
            model: req.db.company,
            attributes: ['id', 'name'],
          },
        ],
      })
      .then(adverts => {
        res.status(200).json(adverts);
      });
  } catch (err) {
    next(err);
  }
});
