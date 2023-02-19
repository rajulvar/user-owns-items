import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemCreatorDto } from './DTO/item-creator.dto';
import { Item } from './item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemFliterDto } from './DTO/fliter-item.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class ListItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async getlItem(fliterItemDto: ItemFliterDto, user: User): Promise<Item[]> {
    const { search } = fliterItemDto;
    const query = this.itemRepository.createQueryBuilder('item');
    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(item.name) LIKE LOWER(:search) OR LOWER(item.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const item = await query.getMany();
    return item;
  }

  async createListItem(
    ItemCreatorDto: ItemCreatorDto,
    user: User,
  ): Promise<Item> {
    const { name, description } = ItemCreatorDto;
    const item = this.itemRepository.create({
      name: name,
      description: description,
      user: user,
    });

    await this.itemRepository.save(item);
    return item;
  }

  async getItemById(id: string, user: User): Promise<Item> {
    const found = await this.itemRepository.findOne({
      where: { id, user },
    });
    if (!found) {
      throw new NotFoundException(`id = ${id} do not exisit in our database`);
    } else {
      return found;
    }
  }

  async deleteItemById(id: string, user: User): Promise<Item> {
    const item: Item = await this.getItemById(id, user);
    await this.itemRepository.remove(item);
    return item;
  }

  async updateItemById(
    id: string,
    description: string,
    user: User,
  ): Promise<Item> {
    const item = await this.getItemById(id, user);
    item.description = description;
    await this.itemRepository.save(item);
    return item;
  }
}
