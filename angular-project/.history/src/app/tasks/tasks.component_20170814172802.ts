import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../task';
import { TaskService } from '../task.service';

import { MdSnackBar } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'my-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  filterTasks: Task[];
  selectedTask: Task;
  date: Date;
  
  constructor (
    private router: Router,
    private taskService: TaskService,
    public snackBar: MdSnackBar
  ) {};

  ngOnInit(): void {
    this.getTasks();
  }
  onSelect(task: Task): void {
    this.selectedTask = task;
  };

  getTasks(): void {
    this.taskService.getTasks()
    .then(tasks => this.tasks = tasks)
    .then(() => this.filterTasks = this.tasks)
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTask.id]);
  }

  add(name: string, description: string): void {
    name = name.trim();
    description = description.trim();
    let trimDate: string = moment(this.date).format('DDMMYYYY');
    debugger
    if (!name || !this.date) { 
      this.snackBar.open('Enter the title of the task and date', null, {
        duration: 3000,
        extraClasses: ['snackbar-styles']
      });
      return;
     }
    this.taskService.create(name, description)
      .then(task => {
        this.tasks.push(task);
        this.selectedTask = null;
      })
      .then(() => {
        this.filterTasks = this.tasks;
      })
  }

  delete(task: Task): void {
  this.taskService
      .delete(task.id)
      .then(() => {
        this.tasks = this.tasks.filter(h => h !== task);
        if (this.selectedTask === task) { this.selectedTask = null; }
      })
      .then(() => {
        this.filterTasks = this.tasks;
      })
  }
  onChangeSearchValue(value: string): void {
    this.filterTasks = this.tasks.filter(task => task.name.toLowerCase().includes(value.toLowerCase()))
  }
}