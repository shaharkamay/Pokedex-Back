const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();



router.get('/get/:id', async (req, res) => {
    const id = req.params.id;

    try {
        if(isNaN(id) || id <= 0) {
            throw { status: 400, message: "id must be of type number" };
        }
        const pokemonData = minimizePokemonObj(await pokedex.getPokemonByName(id));
        res.send(pokemonData);
    } catch (err) {
        console.log(err);
    }
})

router.get("/query", async (req, res) => {
    const name = req.query.name;
    try {
        if(!name) {
            throw { status: 400, message: "name must exist" };
        }
        const pokemonData = minimizePokemonObj(await pokedex.getPokemonByName(name));
        res.send(pokemonData);
    } catch (err) {
        console.log(err);
    }
})

router.put('/catch/:id', async (req, res) => {
    const id = req.params.id;
    try {
        if(isNaN(id) || id <= 0) {
            throw { status: 400, message: "id must be of type number" };
        }
        const pokemonData = minimizePokemonObj(await pokedex.getPokemonByName(id));
        const username = req.username;
        const filePath = path.resolve(path.join('./static-files/users', username, `${id}.json`));
        fs.writeFileSync(filePath, JSON.stringify(pokemonData));
        res.send(pokemonData);
        res.end();
    } catch (err) {
        console.log(err);
    }
})
















function minimizePokemonObj(pokemon) {
    return {
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map(({ type }) => type),
      front_pic: pokemon.sprites.front_default,
      back_pic: pokemon.sprites.back_default,
      abilities: pokemon.abilities.map(({ ability }) => ability),
    };
}

module.exports = router;