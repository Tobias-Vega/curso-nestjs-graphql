import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false },
    { id: 2, description: 'Piedra del Poder', done: true },
    { id: 3, description: 'Piedra del Tiempo', done: false },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

}
