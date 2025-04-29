import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Pokemon } from '../models/pokemon';
import { HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {

    private nextUrl: string;

    constructor() {

        this.nextUrl = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';

    }

    getPokemons() {

      const url = this.nextUrl;
  
      if (url) {

        const options = {
          url,
          headers: {},
          params: {}
      }

        return CapacitorHttp.get(options).then(async (response) =>
          {
          let pokemons: Pokemon[] = [];

          console.log(response);

          if(response.data){

            const results = response.data.results;
            this.nextUrl = response.data.next;

            const promises: Promise<{ data: any }>[] = [];

            for (let index = 0; index < results.length; index++) {
              const pokemon = results[index];
              const urlPokemon = pokemon.url;
              const options = {
                url : urlPokemon,
                headers: {},
                params: {}
              }

              promises.push(CapacitorHttp.get(options));

            }
            await Promise.all(promises).then((responses) =>{
              console.log(responses);

              for (const response of responses){
                const pokemonData = response.data;
                console.log(pokemonData);

                const pokemonObjt = new Pokemon;

                pokemonObjt.id = pokemonData.order;
                pokemonObjt.name = pokemonData.name;
                pokemonObjt.type1 = pokemonData.types[0].type.name;
                if (pokemonData.types[1]) {
                  pokemonObjt.type2 = pokemonData.types[1].type.name;
                }

                pokemonObjt.sprite = pokemonData.sprites.front_default;
                pokemonObjt.weight = pokemonData.weight / 10;
                pokemonObjt.height = pokemonData.height / 10;
                pokemonObjt.stats = pokemonData.stats;

                pokemonObjt.abilities = pokemonData.abilities.filter(ab => !ab.is_hidden).map(ab => ab.ability.name);

                const hiddenAbility = pokemonData.abilities.find(ab => ab.is_hidden);

                if (hiddenAbility) {
                  pokemonObjt.hiddenAbility = hiddenAbility.ability.name;
                }

                pokemons.push(pokemonObjt);

              }

            })
          }

          return pokemons;


        })
  
      }
  
      return null;
  }

}