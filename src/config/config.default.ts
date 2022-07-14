import { MidwayConfig } from '@midwayjs/core';


export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1648288882537_103',
  koa: {
    port: 7001,
  },
  cors: {
    credentials: false,
  },
  jsonp: {
    callback: 'jsonp',
    limit: 512,
  },
} as MidwayConfig;
