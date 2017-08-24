import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskService } from './task.service';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule }     from './app-routing.module';
import { TaskSearchComponent } from './task-search/task-search.component';

import { MaterialModule, MdNativeDateModule  } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { AddTaskComponent } from './add-task/add-task.component';
import { ArchiveComponent } from './archive/archive.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { tasks } from './_reducers/task.reducer';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskDetailComponent,
    DashboardComponent,
    TaskSearchComponent,
    AddTaskComponent,
    ArchiveComponent
  ],
  exports: [
    MdNativeDateModule
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdNativeDateModule,
    StoreModule.forRoot({
      tasks
    }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
