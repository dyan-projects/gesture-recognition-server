const Router = require('express').Router;

module.exports = Router({ mergeParams: true }).get('/ads/:id', async (req, res, next) => {
  try {
    const ad = await req.db.advert.findByPk(req.params.id);
    if (ad === null) {
      res.status(404).json({ error: 'No advert found' });
      return;
    }
    res.json(ad).status(200);
  } catch (err) {
    next(err);
  }
});
