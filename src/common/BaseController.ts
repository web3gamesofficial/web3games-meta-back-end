import { BaseService } from './BaseService';
import { BaseEntity } from './BaseEntity';
import { Body, Post, Query } from '@midwayjs/decorator';
import { Assert } from './Assert';
import { ErrorCode } from './ErrorCode';
import { ApiResponse } from '@midwayjs/swagger';
import { Page } from './Page';

/**
 * Controller base Class，
 */
export abstract class BaseController<T extends BaseEntity> {
  abstract getService(): BaseService<T>;

  @Post('/create')
  async create(@Body() body: T): Promise<T> {
    Assert.notNull(!body.id, ErrorCode.UN_ERROR, 'CreateObjectID should not be null');
    return this.getService().save(body);
  }

  @Post('/delete')
  async delete(@Query('id') id: number): Promise<boolean> {
    await this.getService().delete(id);
    return true;
  }

  @Post('/update')
  async update(@Body() body: T): Promise<T> {
    Assert.notNull(body.id, ErrorCode.UN_ERROR, 'UpdateObjectID should not be null');
    return this.getService().save(body);
  }

  @Post('/findById')
  async findById(@Query('id') id: number): Promise<T> {
    return this.getService().findById(id);
  }

  @ApiResponse({ description: 'Lookup by the same batch of primary keys' })
  @Post('/findByIds')
  async findByIds(@Query('ids') ids: number[]): Promise<T[]> {
    return this.getService().findByIds(ids);
  }

  @ApiResponse({ description: 'page query' })
  @Post('/page')
  async page(@Body() map: Map<string, any>): Promise<Page<T>> {
    const pageNo = map.get('pageNo');
    const pageSize = map.get('pageSize');
    Assert.notNull(pageNo != null && pageNo > 0, ErrorCode.UN_ERROR, 'pageNo can not Null');
    Assert.notNull(pageSize != null && pageSize > 0, ErrorCode.UN_ERROR, 'pageSize can not Null');
    map.delete('pageNo');
    map.delete('pageSize');
    const o = {};
    map.forEach((value, key) => (o[key] = value));
    return this.getService().page(o, pageNo, pageSize);
  }

  @Post('/limit')
  async limit(@Body() map: Map<string, any>) {
    const offset = map.get('offset');
    const limit = map.get('limit');
    Assert.notNull(offset != null && offset > 0, ErrorCode.UN_ERROR, 'offset can not Null');
    Assert.notNull(limit != null && limit > 0, ErrorCode.UN_ERROR, 'limit can not Null');
    map.delete('offset');
    map.delete('limit');
    const o = {};
    map.forEach((value, key) => (o[key] = value));
    return this.getService().limit(o, offset, limit);
  }

  @Post('/findOne')
  async findOne(@Body() body: T): Promise<T> {
    Assert.notNull(!body.id, ErrorCode.UN_ERROR, 'can not find from primary key');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.getService().findOne({ ...body });
  }
}
