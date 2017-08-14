import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private heroService: TaskService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(tasks => this.tasks = tasks.slice(1, 5));
  }
}