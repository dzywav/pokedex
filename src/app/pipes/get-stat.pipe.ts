import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Pipe({
  name: 'getStat',
  standalone: false
})
export class GetStatPipe implements PipeTransform {

  transform(value: Pokemon, nameStat: string): number {


    const statfound = value.stats.find(s=> s.stat.name == nameStat);
    if (statfound) {
      return statfound.base_stat; 
    }
    return 0;
  }

}
