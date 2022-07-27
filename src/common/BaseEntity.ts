import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@midwayjs/swagger';

export class BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: 'UpdaterID' })
  @Column({ type: 'bigint' })
  updaterId: number;

  @ApiProperty({ description: 'CreatorID' })
  @Column({ type: 'bigint' })
  createrId: number;

  @ApiProperty({ description: 'CreateDateTime' })
  @CreateDateColumn()
  createTime: Date;

  @ApiProperty({ description: 'UpdateTime' })
  @UpdateDateColumn()
  updateTime: Date;
}
