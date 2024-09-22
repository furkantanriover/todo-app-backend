import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Sample Todo', description: 'The title of the todo' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'This is a sample todo',
    description: 'The description of the todo',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'image.png',
    description: 'The image associated with the todo',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image?: string;
}
