import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    // 404
    ctx.redirect('/404.html');
  }
}
