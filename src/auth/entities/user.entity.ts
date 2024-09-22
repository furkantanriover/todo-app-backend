import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from '../../todo/entities/todo.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'newuser', description: 'The username of the user' })
  username: string;

  @Column()
  @ApiProperty({
    example: 'hashedpassword',
    description: 'The hashed password of the user',
  })
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  @ApiProperty({
    type: () => [Todo],
    description: 'The todos created by the user',
  })
  todos: Todo[];
}
