import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { HEROES } from './mock-heroes';
import { Hero } from './hero';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService extends InMemoryDbService
{
  createDb()
  {
    let heroes: Hero[] = HEROES;
    return {'hero-list': heroes}; 
  }

  genId(heroes: Hero[]): number
  {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
