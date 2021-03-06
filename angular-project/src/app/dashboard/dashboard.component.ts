import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

import * as moment from 'moment';

import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('taskState', [
      state('done', style({
        color: '#9D9D9D',
        textDecoration: 'line-through'
      })),
      transition('active => removed',
        animate(500, keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 0.2, transform: 'translateX(-50%)', offset: 0.5}),
          style({opacity: 0, transform: 'translateX(-100%)', offset: 1.0})
        ]))
      ),
      transition('void => active',
        animate(300, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 1, offset: 1.0})
        ]))
      )
    ])
  ]
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  currentDate: string = moment().format('DD.MM.YYYY');

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // this.taskService.getTasks()
    //   .then(tasks => {
    //     this.tasks = tasks.filter(task => (task.date === this.currentDate && task.state !== 'removed'))
    //   });
  }

  done(task: Task): void {
    task.state = 'done';
    this.taskService.update(task)
  }
  reestablish(task: Task): void {
    task.state = 'active';
    this.taskService.update(task)
  }

  delete(task: Task): void {
    task.state = 'removed';
    this.taskService
      .update(task)
      .then(tasks => {
        this.tasks = this.tasks.filter(task => (task.date === this.currentDate && task.state !== 'removed'))
      });
  }

}