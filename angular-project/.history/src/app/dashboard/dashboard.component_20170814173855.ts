import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

import * as moment from 'moment';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks()
      .then(tasks => {
        let currentDate = moment().format('DD.MM.YYYY');
        this.tasks = tasks.filter(task => {
          if (task.date === currentDate) {
            return task;
          }
        })
      });
  }
}