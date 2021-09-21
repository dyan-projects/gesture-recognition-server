const Router = require('express').Router;

module.exports = Router({ mergeParams: true }).delete('/v1/adverts/:id', (req, ers, next) => {
  try {
    req.db.advert.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    next(err);
  }
});
