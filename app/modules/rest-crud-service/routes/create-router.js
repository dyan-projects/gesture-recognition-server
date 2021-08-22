const glob = require('glob');
const Router = require('express').Router;

module.exports = () =>
  glob
    .sync('./api/**/*.js', { cwd: `${__dirname}/` }) // searches through current directory and all subdirectories for js files. __dirname points to the cwd of this script
    .map(filename => require(`./${filename}`)) // apply require to each file to retrieve exported objects/functions
    .filter(router => Object.getPrototypeOf(router) == Router) // apply filter to single out only instances of Router
    .reduce((rootRouter, router) => rootRouter.use(router), Router({ mergeParams: true })); // collapse array to a single object and put child routers underneath rootRouter
