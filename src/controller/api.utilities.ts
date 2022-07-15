import {Inject, Controller, Post, Get, Query} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import {mnemonicGenerate,
  mnemonicValidate,
  } from '@polkadot/util-crypto'

@Controller('/api/keys')
export class APIController {
  @Inject()
  ctx: Context;



  @Post('/generated_mnemonic')
  async generated_mnemonic() {
    const mnemonicAccount = mnemonicGenerate();
    return mnemonicAccount;
  }

  @Get('/mnemonic_validate')
  async mnemonic_validate(@Query() queryData) {
    const mnemonicAccount = queryData.mnemonicAlice;
    const isValidMnemonic = mnemonicValidate(mnemonicAccount);
    return isValidMnemonic;
  }
}
