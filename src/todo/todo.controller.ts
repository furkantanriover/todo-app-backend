import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('todos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBody({
    description: 'Todo data',
    type: CreateTodoDto,
    examples: {
      example: {
        value: { title: 'Sample Todo', description: 'This is a sample todo' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The todo has been successfully created.',
    type: Todo,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todoService.create(createTodoDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all todos.', type: [Todo] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Request() req) {
    return this.todoService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiParam({ name: 'id', description: 'Todo ID', example: 1 })
  @ApiResponse({ status: 200, description: 'Return the todo.', type: Todo })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async findOne(@Param('id') id: number, @Request() req) {
    return this.todoService.findOne(+id, req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a todo by id' })
  @ApiParam({ name: 'id', description: 'Todo ID', example: 1 })
  @ApiBody({
    description: 'Updated todo data',
    type: UpdateTodoDto,
    examples: {
      example: {
        value: {
          title: 'Updated Todo',
          description: 'This is an updated todo',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The todo has been successfully updated.',
    type: Todo,
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ) {
    return this.todoService.update(+id, updateTodoDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo by id' })
  @ApiParam({ name: 'id', description: 'Todo ID', example: 1 })
  @ApiResponse({
    status: 204,
    description: 'The todo has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async remove(@Param('id') id: number, @Request() req) {
    return this.todoService.delete(+id, req.user);
  }
}
