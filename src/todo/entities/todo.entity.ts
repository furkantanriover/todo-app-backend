import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the todo' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Sample Todo', description: 'The title of the todo' })
  title: string;

  @Column()
  @ApiProperty({
    example: 'This is a sample todo',
    description: 'The description of the todo',
  })
  description: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'image.png',
    description: 'The image associated with the todo',
    nullable: true,
  })
  image: string;

  @ManyToOne(() => User, (user) => user.todos)
  @ApiProperty({
    type: () => User,
    description: 'The user who created the todo',
  })
  user: User;
}
