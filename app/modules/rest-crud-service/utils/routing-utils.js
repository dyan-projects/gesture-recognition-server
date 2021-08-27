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
  const page = typeof queries.page === 'undefined' ? 1 : queries.page;
  const max = typeof queries.max === 'undefined' ? null : queries.max;
  return { page, max };
};

module.exports = { checkMissingParams, sanitiseQueries };
