import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPokemonPageRoutingModule } from './list-pokemon-routing.module';

import { ListPokemonPage } from './list-pokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPokemonPageRoutingModule
  ],
  declarations: [ListPokemonPage]
})
export class ListPokemonPageModule {}
