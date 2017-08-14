import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
 
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { TaskSearchService } from '../task-search.service';
import { Task } from '../task';

@Component({
  selector: 'task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.scss'],
  providers: [TaskSearchService]
})
export class TaskSearchComponent implements OnInit {
  tasks: Observable<Task[]>;
  // private searchTerms = new Subject<string>();

  @Output() changeSearchValue: EventEmitter<any> = new EventEmitter();

  constructor(
    private taskSearchService: TaskSearchService,
    // private router: Router
  ) { }

  search(term: string): void {
    // this.searchTerms.next(term);
    this.changeSearchValue.emit(term);
  }

  ngOnInit(): void {
    // this.tasks = this.searchTerms
    //   .debounceTime(300)        // wait 300ms after each keystroke before considering the term
    //   .distinctUntilChanged()   // ignore if next search term is same as previous
    //   .switchMap(term => term   // switch to new observable each time the term changes
    //     // return the http search observable
    //     ? this.taskSearchService.search(term)
    //     // or the observable of empty heroes if there was no search term
    //     : Observable.of<Task[]>([]))
    //   .catch(error => {
    //     // TODO: add real error handling
    //     console.log(error);
    //     return Observable.of<Task[]>([]);
    //   });
  // }

  // gotoDetail(task: Task): void {
  //   let link = ['/detail', task.id];
  //   this.router.navigate(link);
  // }
}
