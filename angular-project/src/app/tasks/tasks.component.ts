import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../task';
import { TaskService } from '../task.service';

import { Observable, Subscription} from 'rxjs';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'my-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
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
export class TasksComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  newTasks: Observable<Array<Task>>;
  filterTasks: Task[] = [];
  selectedTask: Task;

  private subscription: Subscription;
  
  constructor (
    private router: Router,
    private taskService: TaskService,
  ) {
    this.newTasks = taskService.tasks;
  };

  ngOnInit(): void {
    // this.getTasks();
    this.subscription = this.newTasks.subscribe(
      tasks => {
        debugger
        this.tasks = tasks;
        this.filterTasks = this.tasks;
      },
      error => {
        debugger
      }
    );
    this.taskService.getTasks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  };

  // getTasks(): void {
  //   this.taskService.getTasks()
  //   .then(tasks => this.tasks = tasks)
  //   .then(() => {
  //     this.filterTasks = this.tasks.filter(task => (task.state !== 'removed'));
  //     this.filterTasks.sort(this.sortTasksByDate);
  //   })
  // }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTask.id]);
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
      .then(() => {
        this.filterTasks = this.tasks.filter(task => (task.state !== 'removed'));
        if (this.selectedTask === task) { this.selectedTask = null; }
      })
  }

  onChangeSearchValue(value: string): void {
    this.filterTasks = this.tasks.filter(task => task.name.toLowerCase().includes(value.toLowerCase()))
  }
  sortTasksByDate(first: Task, second: Task): number {
    let tempFirstDate: number = +first.date.replace(/\./g, '');
    let tempSecondDate: number = +second.date.replace(/\./g, '');
    return tempFirstDate - tempSecondDate;
  }
  onAddNewTask(tasks: Task[]): void {
    this.tasks = tasks;
    this.filterTasks = tasks.filter(task => (task.state !== 'removed'));
    this.filterTasks.sort(this.sortTasksByDate);
    this.selectedTask = null;
  }
}