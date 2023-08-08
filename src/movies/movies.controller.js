const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const isShowing = req.query.is_showing === "true";
    const data = await service.list(isShowing);
    res.json({ data });
};

async function read(req, res) {
    res.json({ data: res.locals.movie });
};

async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId);

    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: `Movie cannot be found.` });
};

async function theatersByMovieId(req, res, next) {
    const movieId = req.params.movieId;
    const theaters = await service.theatersByMovieId(movieId);

    if (!theaters || theaters.length === 0) {
        return next({
        status: 404,
        message: `Theaters not found for movie with ID ${movieId}.`,
        });
    }

    res.json({ data: theaters });
};

async function reviewsWithCriticByMovieId(req, res, next) {
    const { movieId } = req.params;
    try {
      const reviews = await service.reviewsWithCriticByMovieId(movieId);

      if (!reviews || reviews.length === 0) {
        return next({
          status: 404,
          message: `Reviews not found for movie with ID ${movieId}.`,
        });
      }
  
      res.json({ data: reviews });
    } catch (error) {
      next(error);
    }
};
  
module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), read],
    theatersByMovieId: [asyncErrorBoundary(theatersByMovieId)],
    reviewsWithCriticByMovieId: [asyncErrorBoundary(reviewsWithCriticByMovieId)],
};
