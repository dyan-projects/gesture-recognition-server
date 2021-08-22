const Router = require('express').Router;

const sanitiseQueries = queries =>
  Object.entries(queries)
    .map(([key, value]) => [key, isNaN(parseInt(value)) ? 0 : parseInt(value)])
    .reduce((queries, query) => {
      return {
        ...queries,
        [query[0]]: query[1],
      };
    }, {});

const checkMissingParams = queries => {
  let page = queries.page;
  let max = queries.max;
  if (typeof queries.page === 'undefined') page = 1;
  if (typeof queries.max === '') max = 0;
  return { page, max };
};

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
