import { Config, Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { UserContext } from '../common/UserContext';
import { Constant } from '../common/Constant';
import { RedisService } from '@midwayjs/redis';

/**
 * safety verification
 */
@Middleware()
export class SecurityMiddleware {
  @Inject()
  jwtUtil: JwtService;

  @Inject()
  cacheUtil: RedisService;

  @Config('app.security')
  securityConfig;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError('缺少访问凭证，请添加Header[Authorization=Bearer accessToken]');
      }
      const parts = ctx.get('authorization').trim().split(' ');
      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError('无效的凭证');
      }
      const [scheme, token] = parts;
      if (!/^Bearer$/i.test(scheme)) {
        throw new httpError.UnauthorizedError('缺少Bearer');
      }
      // check token，timeout return error
      const jwt = await this.jwtUtil.verify(token, { complete: true });
      // jwt userinfo
      const payload = jwt['payload'];
      const key = Constant.TOKEM + ':' + payload.userId + ':' + token;
      const ucStr = await this.cacheUtil.get(key);
      // serve cache user info storage
      const uc: UserContext = JSON.parse(ucStr);
      if (payload.username !== uc.username) {
        throw new httpError.UnauthorizedError('无效的凭证');
      }
      // context
      ctx.userContext = uc;
      return next();
    };
  }

  public match(ctx: Context): boolean {
    const { path } = ctx;
    const { prefix, ignore } = this.securityConfig;
    const exist = ignore.find((item) => {
      return item.match(path);
    });
    return path.indexOf(prefix) === 0 && !exist;
  }

  public static getName(): string {
    return 'SECURITY';
  }
}
