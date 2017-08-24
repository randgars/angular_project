import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { TaskService } from '../task.service';
import { Task } from '../task';

import { MdSnackBar, MdDatepicker } from '@angular/material';

import * as moment from 'moment';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  date: Date;

  @Input() task: Task;

  @ViewChild(MdDatepicker) datepicker: MdDatepicker<Date>;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    public snackBar: MdSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.taskService.getTask(+params.get('id')))
      .subscribe(task => {
        this.task = task;
      });
  }

  save(): void {
    if (!this.task.name) {
      this.snackBar.open('Enter the title of the task', null, {
        duration: 3000
      });
      return;
    }
    if (this.date) {
      this.task.date = moment(this.date).format('DD.MM.YYYY');
    }
    this.taskService.update(this.task)
      .then(() => this.goBack());
  }
  
  goBack(): void {
    this.location.back();
  }

  openPicker(): void {
    this.datepicker.open();
  }
}
