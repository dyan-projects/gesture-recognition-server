const Router = require('express').Router;

module.exports = Router({ mergeParams: true }).put('/v1/adverts/:id/likes', (req, res, next) => {
  try {
    req.db.advert.findByPk(req.params.id).then(advert => {
      advert.likes += req.body.like;
      advert.dislikes += req.body.dislike;
      if (advert.likes < 0) advert.likes = 0;
      if (advert.dislikes < 0) advert.dislikes = 0;
      advert.save().then(() => res.status(200).send(advert));
    });
  } catch (err) {
    next(err);
  }
});
