import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListItemsController } from './list-items.controller';
import { ListItemsService } from './list-items.service';
import { Item } from './item.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), AuthModule],
  controllers: [ListItemsController],
  providers: [ListItemsService],
})
export class ListItemsModule {}
