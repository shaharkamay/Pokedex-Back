const express = require("express");
const fs = require("fs");
const path = require("path");
const userRouter = express.Router();
const Pokedex = require("pokedex-promise-v2");
const pokedex = new Pokedex();

module.exports.errorHandler = (err, req, res, next) => {
    // if (!err.status) {
    //     console.error(err);
    //     res.status(500);
    //     res.send({ error: "Internal server error"});
    // } else {
    //     res.status(err.status);
    //     res.send({ error: err.message });
    // }

    console.log(err);
    res.status(err.status).json(err.message);
    res.end();
}