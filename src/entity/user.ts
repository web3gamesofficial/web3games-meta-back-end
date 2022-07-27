import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { BaseEntity } from '../common/BaseEntity';
import { ApiProperty } from '@midwayjs/swagger';

@EntityModel('user')
export class User extends BaseEntity {
  @ApiProperty({ description: 'avatar' })
  @Column({ length: 100, nullable: true })
  avatarUrl: string;

  @ApiProperty({ description: 'username' })
  @Column({ length: 20, unique: true })
  username: string;

  @ApiProperty({ description: 'password' })
  @Column({ length: 200 })
  password: string;

  @ApiProperty({ description: 'Phone' })
  @Column({ length: 20 })
  phoneNum: string;

  @ApiProperty({ description: 'registration' })
  @Column()
  regtime: Date;

  @ApiProperty({ description: 'state 0：unused，1：normal' })
  @Column({ type: 'int', default: 1 })
  status: number;
}
