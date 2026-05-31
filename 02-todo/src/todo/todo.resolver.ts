import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './dto/args/status.args';

@Resolver(() => Todo)
export class TodoResolver {

  constructor(
    private readonly todoService: TodoService,
  ) {}

  @Query(() => [Todo], {
    name: 'todos'
  })
  findAll(
    @Args() statusArgs: StatusArgs
  ): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, {
    name: 'todo'
  })
  findOne(
    @Args('id', { type: () => Int }) id: number
  ): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, {
    name: 'createTodo'
  })
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput
  ): Todo {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, {
    name: 'updateTodo'
  })
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
  ): Todo {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean)
  removeTodo(
    @Args('id', { type: () => Int }) id: number
  ): Boolean {
    return this.todoService.remove(id);
  }
}
