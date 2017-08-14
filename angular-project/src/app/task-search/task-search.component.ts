import { Component, Output, EventEmitter } from '@angular/core';
 
import { Observable } from 'rxjs/Observable';

import { Task } from '../task';

@Component({
  selector: 'task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss']
})
export class TaskSearchComponent {
  tasks: Observable<Task[]>;

  @Output() changeSearchValue: EventEmitter<any> = new EventEmitter();
  
  search(term: string): void {
    this.changeSearchValue.emit(term);
  }
}
