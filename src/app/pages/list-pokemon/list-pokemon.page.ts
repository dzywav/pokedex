import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';
import { LoadingController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.page.html',
  styleUrls: ['./list-pokemon.page.scss'],
  standalone : false,
})
export class ListPokemonPage implements OnInit {

  public pokemons : Pokemon [];

  constructor(
    private pokemonService : PokemonService,
    private loadingController : LoadingController,
    private navParams : NavParams,
    private navCOntroller : NavController

  ) { 
    this.pokemons = [];
  }

  ngOnInit() {
    this.morePokemon();
  }

  async morePokemon($event = null){

    const promise = this.pokemonService.getPokemons();

    if (promise) {

      let loading = null;

      if (!$event) {
        loading = await this.loadingController.create({
          message: 'cargando...'
        });
        await loading.present();
      }

      promise.then((result : Pokemon[]) =>{

        console.log(result);

        this.pokemons = this.pokemons.concat(result);

        console.log(this.pokemons)

        if ($event) {
          $event.target.complete();
        }

        if (loading) {
          loading.dismiss();
        }

      }).catch((err) =>{
        if ($event) {
          $event.target.complete();
        }
        if (loading) {
          loading.dismiss();
        }
      })
      
    }
  }

  goToDetail(pokemon: Pokemon){

    this.navParams.data["pokemon"] = pokemon;
    this.navCOntroller.navigateForward("detail-pokemon")

  }

}
