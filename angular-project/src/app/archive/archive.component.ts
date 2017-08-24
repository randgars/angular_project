import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'my-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  animations: [
    trigger('taskState', [
      state('removed', style({
        color: '#9D9D9D'
      })),
      transition('removed => active',
        animate(500, keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 0.2, transform: 'translateX(-50%)', offset: 0.5}),
          style({opacity: 0, transform: 'translateX(-100%)', offset: 1.0})
        ]))
      ),
      transition('removed => void',
        animate(300, keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 0.2, transform: 'translateX(-50%)', offset: 0.5}),
          style({opacity: 0, transform: 'translateX(-100%)', offset: 1.0})
        ]))
      ),
      transition('void => removed',
        animate(300, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 1, offset: 1.0})
        ]))
      )
    ])
  ]
})
export class ArchiveComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // this.taskService.getTasks()
    //   .then(tasks => {
    //     this.tasks = tasks.filter(task => (task.state === 'removed'))
    //   });
  }

  restore(task: Task): void {
    task.state = 'active';
    this.taskService
      .update(task)
      .then(() => {
        this.tasks = this.tasks.filter(task => (task.state === 'removed'))
      });
  }

  delete(task: Task): void {
    this.taskService
      .delete(task.id)
      .then(() => {
        this.tasks = this.tasks.filter(h => (task !== h))
      });
  }

}
