import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Task } from './task';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'})

  constructor(private http: Http) {}

  getHeroes(): Promise<Task[]> {
    return this.http.get(this.heroesUrl).toPromise()
                .then(response => response.json().data as Task[])
                .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getHero(id: number): Promise<Task> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Task)
            .catch(this.handleError);
  }

  update(task: Task): Promise<Task> {
    const url = `${this.heroesUrl}/${task.id}`;
    return this.http
            .put(url, JSON.stringify(task), {headers: this.headers})
            .toPromise()
            .then(() => task)
            .catch(this.handleError);
  }

  create(name: string): Promise<Task> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Task)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}