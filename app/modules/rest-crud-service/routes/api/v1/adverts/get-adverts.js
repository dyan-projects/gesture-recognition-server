const Router = require('express').Router;
const { checkMissingParams, sanitiseQueries } = require('../../../../utils/routing-utils');

module.exports = Router({ mergeParams: true }).get('/v1/adverts', (req, res, next) => {
  let limit = null;
  let offset = 0;
  if (Object.entries(req.query).length > 0) {
    // retrieve current page and max results respectively
    const { page, max } = checkMissingParams(sanitiseQueries(req.query));
    // page numbers start at 1
    offset = (page - 1) * max;
    limit = max === 0 ? null : max;
  }

  const options = {
    limit: limit,
    offset: offset,
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
    req.db.advert.findAndCountAll(options).then(adverts => {
      res.status(200).json(adverts);
    });
  } catch (err) {
    next(err);
  }
});
