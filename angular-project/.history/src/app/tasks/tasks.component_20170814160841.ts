import { Component, OnInit, Output, ngDoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { Task } from '../task';
import { TaskService } from '../task.service';

import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'my-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, ngDoCheck {
  tasks: Task[];
  filterTasks: Task[];
  selectedTask: Task;
  
  @Output() selectedChanged

  ngDoCheck(): void {

  }
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
    debugger
    if (!name) { 
      this.snackBar.open('Enter the title of the task', null, {
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