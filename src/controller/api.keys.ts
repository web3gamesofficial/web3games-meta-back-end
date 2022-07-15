import {Inject, Controller, Post} from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';

@Controller('/api/keys')
export class APIController {
  @Inject()
  ctx: Context;



  @Post('/mnemonicGenerate')
  async mnemonic_generate() {
    await cryptoWaitReady();
    const mnemonic = mnemonicGenerate(12);
    return mnemonic;
  }

  @Post('/keys_generate_sr25519')
  async keys_generate_sr25519() {
    await cryptoWaitReady();
    const mnemonic = mnemonicGenerate(12);
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 42 });
    const keys = keyring.createFromUri(mnemonic, { name: 'sr25519' });
    return keys;
  }
}
