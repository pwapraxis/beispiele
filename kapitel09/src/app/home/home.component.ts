import { environment } from './../../environments/environment';
import { DatabaseService } from './../database.service';
import { Component, OnInit } from '@angular/core';
import * as uuidV4 from 'uuid/v4';
import { Todo } from '../todo';
import { MatSelectionListChange } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos: Todo[];
  canRegister = false;

  constructor(private databaseService: DatabaseService, private httpClient: HttpClient, private swPush: SwPush) { }

  ngOnInit() {
    this.updateTodos();
    this.swPush.subscription.pipe(
      tap(sub => this.canRegister = !sub && Notification.permission !== 'denied'),
      filter(sub => !!sub),
      switchMap(sub => this.httpClient.post(`${environment.baseUrl}push`, sub.toJSON()))
    ).subscribe();
  }

  async registerForPush() {
    await this.swPush.requestSubscription({
      serverPublicKey: ' << HIER KEY EINFÜGEN >> '
    });
  }

  async updateTodos() {
    this.todos = await this.databaseService.todos.toArray();
  }

  async addTodo(title: string) {
    await this.databaseService.todos.add({ id: uuidV4(), title, done: false });
    this.updateTodos();
  }

  async toggleTodo(event: MatSelectionListChange) {
    const todo = event.option.value;
    todo.done = !todo.done;
    await this.databaseService.todos.put(todo);
  }

  async sync() {
    const todos = await this.databaseService.todos.toArray();
    const newTodos = await this.httpClient.post<Todo[]>(`${environment.baseUrl}sync`, todos).toPromise();
    await this.databaseService.todos.bulkPut(newTodos);
    this.updateTodos();
  }
}
