import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
