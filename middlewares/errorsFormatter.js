const fs = require("fs");
const path = require("path");

module.exports = function (err, req, res, next) {
    res.status(500).json({
        error: err.name,
        message: err.message
    })
}