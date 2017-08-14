import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  constructor(
    private heroService: TaskService,
    private route: ActivatedRoute,
    private location: Location
  ) {};

  @Input() task: Task;

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.heroService.getTask(+params.get('id')))
      .subscribe(task => this.task = task);
  };

  save(): void {
    this.heroService.update(this.task)
      .then(() => this.goBack());
  }
  
  goBack(): void {
    this.location.back();
  }
}
