import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ItemCreatorDto } from './DTO/item-creator.dto';
import { ListItemsService } from './list-items.service';
import { Item } from './item.entity';
import { ItemFliterDto } from './DTO/fliter-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('list-items')
@UseGuards(AuthGuard())
export class ListItemsController {
  constructor(private listItemService: ListItemsService) {}

  @Get()
  getItems(
    @Query() filterItemDto: ItemFliterDto,
    @GetUser() user: User,
  ): Promise<Item[]> {
    return this.listItemService.getlItem(filterItemDto, user);
  }

  @Get('/:id')
  getItemById(@Param('id') id: string, @GetUser() user: User): Promise<Item> {
    return this.listItemService.getItemById(id, user);
  }

  @Post()
  createItem(
    @Body() ItemCreatorDto: ItemCreatorDto,
    @GetUser() user: User,
  ): Promise<Item> {
    return this.listItemService.createListItem(ItemCreatorDto, user);
  }

  @Delete('/:id')
  deleteItemById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Item> {
    return this.listItemService.deleteItemById(id, user);
  }

  @Patch('/:id/description')
  updateDescriptionById(
    @Param('id') id: string,
    @Body('description') description: string,
    @GetUser() user: User,
  ): Promise<Item> {
    return this.listItemService.updateItemById(id, description, user);
  }
}
