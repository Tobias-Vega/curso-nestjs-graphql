import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false },
    { id: 2, description: 'Piedra del Tiempo', done: false },
    { id: 3, description: 'Piedra del Espacio', done: true },
  ];

  create(createTodoDto: CreateTodoDto): Todo {

    const { description } = createTodoDto;

    const maxId = this.todos.length > 0 ? Math.max(...this.todos.map(todo => todo.id)) : 0;

    const newTodo = {
      id: maxId + 1,
      description,
      done: false,
    }

    this.todos.push(newTodo);

    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find(todo => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);

    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Todo {

    const { done, description } = updateTodoDto;

    const todo = this.findOne(id);

    if (done !== undefined) todo.done = done;
    if (description) todo.description = description;

    this.todos = this.todos.map(dbTodo => {
      if (dbTodo.id === id) return todo;

      return dbTodo;
    })

    return todo;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
