import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { Hero } from '../hero';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService)
  {
  }

  ngOnInit()
  {
    this.heroService.getHeroes().subscribe(data => this.heroes = data.slice(1, 5));
  }
  
}
