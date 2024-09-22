import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const todo = this.todoRepository.create({ ...createTodoDto, user });
    return this.todoRepository.save(todo);
  }

  async findAll(user: User): Promise<Todo[]> {
    return this.todoRepository.find({ where: { user: { id: user.id } } });
  }

  async findOne(id: number, user: User): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
    user: User,
  ): Promise<Todo> {
    const todo = await this.findOne(id, user);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    // Ensure updateTodoDto is not empty
    if (Object.keys(updateTodoDto).length === 0) {
      throw new Error('Update values are not defined');
    }
    const updatedTodo = Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(updatedTodo);
  }

  async delete(id: number, user: User): Promise<void> {
    const result = await this.todoRepository.delete({
      id,
      user: { id: user.id },
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
