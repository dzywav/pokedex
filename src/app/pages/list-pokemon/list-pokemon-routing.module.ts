import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPokemonPage } from './list-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: ListPokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPokemonPageRoutingModule {}
