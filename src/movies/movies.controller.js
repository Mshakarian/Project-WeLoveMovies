const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: "Movie cannot be found." });
}

// async function list(req, res) {
//   const is_showing = req.query.is_showing;
//   console.log(is_showing);
//   if (is_showing === true) {
//     res.json({ data: await service.listMoviesShowing() });
//   } else {
//     res.json({ data: await service.list() });
//   }
// }

async function list(req, res, next) {
  const queryResult = await service.list(req.query.is_showing);
  res.json({ data: queryResult });
}

function read(req, res) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function reviewsByMovieId(req, res) {
  const { movieId } = req.params;
  const data = await service.reviewsByMovieId(Number(movieId));
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  reviewsByMovieId: [asyncErrorBoundary(reviewsByMovieId)],
};
