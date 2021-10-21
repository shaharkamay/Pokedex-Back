const express = require("express");
const fs = require("fs");
const path = require("path");
const userRouter = express.Router();
const Pokedex = require("pokedex-promise-v2");
const pokedex = new Pokedex();


userRouter.post("/info", (req, res) => {
    const  username  = req.username;
    try {
        if(username){
            res.send(username)
            res.end();
        }else{
            throw { status: 400, message: "user doesnt exist!" };
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = userRouter;