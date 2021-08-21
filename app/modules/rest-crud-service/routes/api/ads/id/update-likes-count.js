const Router = require('express').Router;

module.exports = Router({ mergeParams: true }).put('ads/:id/likes', (req, res, next) => {
  try {
    req.db.advert.findByPk(req.params.id).then(advert => {
      advert.likes += req.body.like;
      advert.dislikes += req.body.dislike;
      advert.save().then(updatedAdvert => {
        res.send(updatedAdvert).status(200);
      });
    });
  } catch (err) {
    next(err);
  }
});
