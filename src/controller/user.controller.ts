import { Body, Controller, Inject, Post, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { User } from '../entity/user';
import { BaseController } from '../common/BaseController';
import { BaseService } from '../common/BaseService';
import { RedisService } from '@midwayjs/redis';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@midwayjs/swagger';
import { encrypt } from '../utils/PasswordEncoder';
import { Assert } from '../common/Assert';
import { ErrorCode } from '../common/ErrorCode';
import { Page } from '../common/Page';

@ApiTags(['user'])
@ApiBearerAuth()
@Controller('/api/user')
export class UserController extends BaseController<User> {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  cacheUtil: RedisService;

  getService(): BaseService<User> {
    return this.userService;
  }

  @ApiResponse({ type: User })
  @Post('/create', { description: 'create' })
  async create(@Body() user: User): Promise<User> {
    Assert.isTrue(user.username !== null, ErrorCode.UN_ERROR, 'username can not be empty');
    Assert.isTrue(user.password !== null, ErrorCode.UN_ERROR, 'password can not be empty');
    Assert.isTrue(user.phoneNum !== null, ErrorCode.UN_ERROR, 'phoneNum can not be empty');
    const { userId } = this.ctx.userContext;
    Object.assign(user, {
      regtime: new Date(),
      updaterId: userId,
      createrId: userId,
      password: encrypt(user.password),
    });
    const newUser = super.create(user);
    return Object.assign(newUser, { password: null });
  }

  @Post('/delete', { description: 'delete' })
  async delete(@Query('id') id: number): Promise<boolean> {
    return super.delete(id);
  }

  @ApiResponse({ type: User })
  @Post('/update', { description: 'update' })
  async update(@Body() user: User): Promise<User> {
    return super.update(user);
  }

  @ApiResponse({ type: User })
  @Post('/findById', { description: 'findById' })
  async findById(@Query('id') id: number): Promise<User> {
    return super.findById(id);
  }

  @ApiResponse({ type: User })
  @Post('/findByIds', { description: 'findByIds' })
  async findByIds(@Body('ids') ids: number[]): Promise<User[]> {
    return super.findByIds(ids);
  }

  @ApiResponse({ type: User })
  @Post('/page', { description: 'page' })
  async page(@Body() map: Map<string, any>): Promise<Page<User>> {
    return super.page(map);
  }

  @ApiResponse({ type: User })
  @Post('/limit', { description: 'limit' })
  async limit(@Body() map: Map<string, any>) {
    return super.limit(map);
  }

  @ApiResponse({ type: User })
  @Post('/findOne', { description: 'findOne' })
  async findOne(@Body() user: User): Promise<User> {
    return super.findOne(user);
  }
}
