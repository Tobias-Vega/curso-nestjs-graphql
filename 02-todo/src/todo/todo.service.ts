import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import {CreateTodoInput,  UpdateTodoInput } from './dto/inputs';

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

  update(updateTodoInput: UpdateTodoInput): Todo {
    const { id, description, done } = updateTodoInput;

    const todoToUpdate = this.findOne(id);

    if (done !== undefined) todoToUpdate.done = done;
    if (description) todoToUpdate.description = description;

    this.todos = this.todos.map(todo => {
      return (todo.id === id ? todoToUpdate : todo);
    })

    return todoToUpdate;
  }

  remove(id: number): Boolean {
    this.findOne(id);

    this.todos = this.todos.filter(todo => todo.id !== id);

    return true;
  }
}
