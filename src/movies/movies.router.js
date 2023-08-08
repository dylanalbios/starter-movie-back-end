const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed.js");
const cors = require("cors");

router.use(cors());

router
    .route("/:movieId/theaters")
    .get(controller.theatersByMovieId);

router
    .route("/:movieId/reviews")
    .get(controller.reviewsWithCriticByMovieId);

router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;
