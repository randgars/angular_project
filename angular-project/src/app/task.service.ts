import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Task } from './task';

import { Store } from '@ngrx/store';

import { AppStore } from './app.store';

@Injectable()

export class TaskService {
  tasks: Observable<Array<Task>>; 

  private tasksUrl = 'api/tasks';
  private headers = new Headers({'Content-Type': 'application/json'})

  constructor(
    private store: Store<AppStore>,
    private http: Http
  ) {
    this.tasks = store.select( store => store.tasks);
  }

  getTasks()  {
    return this.http.get(this.tasksUrl)
                    .map((response) => {
                        return response.json().data as Task[] || {};
                    })
                    .map((payload: Task[] ) => {
                        return { type: 'GET_TASKS', payload };
                    })
                    .subscribe((action) => {
                        this.store.dispatch(action);
                    });
  }
  // getTasks(): Promise<Task[]> {
  //   return this.http.get(this.tasksUrl).toPromise()
  //               .then(response => response.json().data as Task[])
  //               .catch(this.handleError)
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getTask(id: number): Promise<Task> {
    const url = `${this.tasksUrl}/${id}`
    return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Task)
            .catch(this.handleError);
  }

  update(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http
            .put(url, JSON.stringify(task), {headers: this.headers})
            .toPromise()
            .then(() => task)
            .catch(this.handleError);
  }

  create(name: string, description: string, date: string, state: string): Promise<Task> {
    return this.http
      .post(this.tasksUrl, JSON.stringify({name: name, description: description, date: date, state: state}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Task)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}