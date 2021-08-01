const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodnotAllowed");
const theatersRouter = require("../theaters/theaters.router");

router.route("/").get(controller.list).all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.reviewsByMovieId)
  .all(methodNotAllowed);

router.use("/:movieId/theaters", theatersRouter);

module.exports = router;
