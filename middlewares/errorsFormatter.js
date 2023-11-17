const fs = require("fs");
const path = require("path");

module.exports = function (err, req, res, next) {
    res.format({
        json: () => {
            console.log(err)
            res.status(500).json({
                error: err.name,
                message: err.message
            });
        },
        default: () => {
            res.status(500).send(`<h1>${err.message}</h1>`);
        }
    })
}