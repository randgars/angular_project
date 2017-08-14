import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
 
import { Observable } from 'rxjs/Observable';

import { Task } from '../task';

@Component({
  selector: 'task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss']
})
export class TaskSearchComponent implements OnInit {
  tasks: Observable<Task[]>;

  @Output() changeSearchValue: EventEmitter<any> = new EventEmitter();

  constructor() { }

  search(term: string): void {
    this.changeSearchValue.emit(term);
  }

  ngOnInit(): void {
  }

}
