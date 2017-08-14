import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
import { Task } from './task';
 
@Injectable()
export class HeroSearchService {
 
  constructor(private http: Http) {}
 
  search(term: string): Observable<Task[]> {
    return this.http
               .get(`api/heroes/?name=${term}`)
               .map(response => response.json().data as Task[]);
  }
}