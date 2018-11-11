import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  todos: Dexie.Table<Todo, string>;

  constructor() {
    super('todo-db');
    this.version(1).stores({
      todos: 'id, title, done'
    });
  }
}
