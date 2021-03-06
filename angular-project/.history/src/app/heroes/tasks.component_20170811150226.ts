import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../task';
import { TaskService } from '../task.service'

@Component({
  selector: 'my-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  selectedHero: Task;

  constructor (
    private router: Router,
    private heroService: TaskService) {};

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(task: Task): void {
    this.selectedHero = task;
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
      .then(task => {
        this.tasks.push(task);
        this.selectedHero = null;
      });
  }

  delete(task: Task): void {
  this.heroService
      .delete(task.id)
      .then(() => {
        this.tasks = this.tasks.filter(h => h !== task);
        if (this.selectedHero === task) { this.selectedHero = null; }
      });
}
}