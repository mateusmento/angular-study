import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  )
  {
  }

  ngOnInit() {
    this.getHero();
  }

  getHero()
  {
    let heroId = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(heroId)
      .subscribe(data => this.hero = data);
  }

  goBack()
  {
    this.location.back();
  }

  save()
  {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
