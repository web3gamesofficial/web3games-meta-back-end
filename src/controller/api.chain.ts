import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ApiPromise, WsProvider } from '@polkadot/api';


const {WSS_NETWORK} = process.env;

const environment_api = async ()=>{
  const provider = new WsProvider(WSS_NETWORK);
  const api = await ApiPromise.create({ provider });
  return api
}

@Controller('/api/chain')
export class APIController {
  @Inject()
  ctx: Context;


  @Get('/getChainProperties')
  async getChainProperties(@Query() queryData) {
    const api = await environment_api();
    const chainInfo = await api.registry.getChainProperties();
    return chainInfo;
  }
}
