import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

import { MdSnackBar, MdDatepicker } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  date: Date;
  selectedTask: Task;
  task: string;
  description: string = '';
  titleRequired: boolean = false;

  @Input() tasks: Task[];
  @Output() addNewTask: EventEmitter<any> = new EventEmitter();

  @ViewChild(MdDatepicker) datepicker: MdDatepicker<Date>;
  
  constructor(
    private taskService: TaskService,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {}

  add(): void {
    if (!this.task) {
      this.titleRequired = true;
      this.snackBar.open('Enter the title of the task', null, {
        duration: 3000
      });
      return;
    }
    if (!this.date) {
      this.datepicker.open();
      this.snackBar.open('Enter the date of the task', null, {
        duration: 3000
      });
      return;
    }
    this.task = this.task.trim();
    this.description = this.description.trim();
    let trimDate: string = moment(this.date).format('DD.MM.YYYY');
    let state: string = 'active';
    
    this.taskService.create(this.task, this.description, trimDate, state).then(task => {
      this.tasks.push(task);
    }).then(() => {
      this.addNewTask.emit(this.tasks);
      this.task='';
      this.description='';

      this.titleRequired = false;
    })
  }

  openPicker(): void {
    this.datepicker.open();
  }
}
