const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const pokedex = new Pokedex();



router.get('/get/:id', async (req, res) => {
    const id = req.params.id;

    try {
        if(isNaN(id) || id <= 0) {
            throw { status: 400, message: "id must be of type number" };
        }
        const pokemonData = parsePokemon(await pokedex.getPokemonByName(id));
        res.send(pokemonData);
    } catch (err) {
        console.log(err);
    }
})

router.get("/query", (req, res) => {

    // pokedex.getPokemonByName('eevee') // with Promise
    // .then(function(response) {
    //     console.log(response);
    // })
    // .catch(function(error) {
    //     console.log('There was an ERROR: ', error);
    // });

})

function parsePokemon(pokemon) {
    return {
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map(({ type }) => type),
      front_pic: pokemon.sprites.front_pic,
      back_pic: pokemon.sprites.back_pic,
      abilities: pokemon.abilities.map(({ ability }) => ability),
    };
}

module.exports = router;