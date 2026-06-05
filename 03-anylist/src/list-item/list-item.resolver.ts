import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ListItemService } from './list-item.service';
import { ListItem } from './entities/list-item.entity';
import { CreateListItemInput, UpdateListItemInput } from './dto/inputs';

@Resolver(() => ListItem)
@UseGuards(JwtAuthGuard)
export class ListItemResolver {
  constructor(private readonly listItemService: ListItemService) {}

  @Mutation(() => ListItem)
  async createListItem(
    @Args('createListItemInput') createListItemInput: CreateListItemInput,
    //! TODO: pedir el usuario para validarlo
  ): Promise<ListItem> {
    return await this.listItemService.create(createListItemInput);
  }

  @Query(() => ListItem, { name: 'listItem' })
  async findOne(@Args(
    'id', { type: () => ID }, ParseUUIDPipe) 
    id: string): Promise<ListItem> {
    return await this.listItemService.findOne(id);
  }

  @Mutation(() => ListItem)
  async updateListItem(@Args('updateListItemInput') updateListItemInput: UpdateListItemInput): Promise<ListItem> {
    return await this.listItemService.update(updateListItemInput.id, updateListItemInput);
  }

  // @Mutation(() => ListItem)
  // removeListItem(@Args('id', { type: () => Int }) id: number) {
  //   return this.listItemService.remove(id);
  // }
}
