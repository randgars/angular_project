import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { HeroService } from '../hero.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Task[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(tasks => this.tasks = tasks.slice(1, 5));
  }
}