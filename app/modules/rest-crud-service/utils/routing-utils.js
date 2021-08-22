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

module.exports = { checkMissingParams, sanitiseQueries };
