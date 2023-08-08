const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
    const isShowing = req.query.is_showing === "true";
    const data = await service.list(isShowing);
    res.json({ data });
};

async function read(req, res) {
    res.json({ data: res.locals.movies });
};

module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(read)],
};
