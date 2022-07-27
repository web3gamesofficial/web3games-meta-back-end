import { IMiddleware } from '@midwayjs/core';
import {Config, Middleware} from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { ErrorCode } from '../common/ErrorCode';

/**
 *
 * Uniform packaging of the data returned by the interface
 */
@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  @Config('app.security')
  securityConfig;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      return { code: ErrorCode.OK, msg: 'OK', data: result };
    };
  }

  match(ctx) {
    const { prefix } = this.securityConfig;
    return ctx.path.indexOf(prefix) === 0;
  }

  static getName(): string {
    return 'API_RESPONSE_FORMAT';
  }
}
