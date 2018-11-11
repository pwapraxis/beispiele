import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSelectionListChange } from '@angular/material';
import { SwPush } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { filter, switchMap, tap } from 'rxjs/operators';
import * as uuidV4 from 'uuid/v4';
import { SyncService } from '../sync.service';
import { Todo } from '../todo';
import { TodoDialogComponent } from '../todo-dialog/todo-dialog.component';
import { environment } from './../../environments/environment';
import { DatabaseService } from './../database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  todos: Todo[];
  canRegister = false;
  subscriptions: Subscription[] = [];

  constructor(private databaseService: DatabaseService,
              private httpClient: HttpClient,
              private swPush: SwPush,
              private syncService: SyncService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.updateTodos();
    this.subscriptions.push(this.syncService.syncDone.subscribe(() => this.updateTodos()));
    this.subscriptions.push(this.swPush.subscription.pipe(
      tap(sub => this.canRegister = !sub && Notification.permission !== 'denied'),
      filter(sub => !!sub),
      switchMap(sub => this.httpClient.post(`${environment.baseUrl}push`, sub.toJSON()))
    ).subscribe());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  async registerForPush() {
    await this.swPush.requestSubscription({
      serverPublicKey: ' << HIER KEY EINFÜGEN >> '
    });
  }

  async updateTodos() {
    this.todos = await this.databaseService.todos.toArray();
  }

  addTodo() {
    this.dialog.open(TodoDialogComponent, {
      width: '350px',
      data: {title: ''},
    }).afterClosed().pipe(
      filter(title => !!title),
      switchMap((title: string) => fromPromise(this.databaseService.todos.add({id: uuidV4(), title, done: false}))),
    ).subscribe(() => this.updateTodos());
  }

  async toggleTodo(event: MatSelectionListChange) {
    const todo = event.option.value;
    todo.done = !todo.done;
    await this.databaseService.todos.put(todo);
  }
}
