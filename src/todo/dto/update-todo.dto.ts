import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({
    example: 'Updated Todo',
    description: 'The title of the todo',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'This is an updated todo',
    description: 'The description of the todo',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'updated_image.png',
    description: 'The image associated with the todo',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  image?: string;
}
