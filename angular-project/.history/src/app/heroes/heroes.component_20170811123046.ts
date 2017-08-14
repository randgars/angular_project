import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../task';
import { HeroService } from '../hero.service'

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  tasks: Task[];
  selectedHero: Task;

  constructor (
    private router: Router,
    private heroService: HeroService) {};

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Task): void {
    this.selectedHero = hero;
  };

  getHeroes(): void {
    this.heroService.getHeroes().then(tasks => this.tasks = tasks);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.tasks.push(hero);
        this.selectedHero = null;
      });
  }

  delete(hero: Task): void {
  this.heroService
      .delete(hero.id)
      .then(() => {
        this.tasks = this.tasks.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
}
}