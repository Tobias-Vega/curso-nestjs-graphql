import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';

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

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id);

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const { description } = createTodoInput;
    const maxId = this.todos.length > 0 ? Math.max(...this.todos.map(todo => todo.id)) : 0;
  
    const newTodo = {
      id: maxId + 1,
      description,
      done: false,
    }

    this.todos.push(newTodo);

    return newTodo;
  }

}
