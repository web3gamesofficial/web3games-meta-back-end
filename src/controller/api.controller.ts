import { Inject, Controller,Post } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import * as data from  '../../key/key.json';
import { KeyringPair$Json } from '@polkadot/keyring/types';


const {WALLET_PASSWORD,WSS_NETWORK} = process.env;


const environment_account = async ()=>{
  await cryptoWaitReady();
  const keyring = new Keyring({ type: 'sr25519' });
  const Key:KeyringPair$Json = data as unknown as KeyringPair$Json;
  const account = keyring.addFromJson(Key);
  account.unlock(WALLET_PASSWORD);
  return account
}

const environment_api = async ()=>{
  const provider = new WsProvider(WSS_NETWORK);
  const api = await ApiPromise.create({ provider });
  return api
}

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;






  //tokenFungible

  @Post('/tokenFungible/approve')
  async approve() {
    const token_fungible_id = 3 ;
    const spender = "5Eeh22xf25G6qtgFhBZJYCorYKPVVtQKGkLUd9RQLYfcruhb"
    const amount = 1000000 ;

    const api = await environment_api();
    const account = await environment_account();

    const tokenFungible = await api.tx.tokenFungible.approve(token_fungible_id,spender,amount);
    const hash = await tokenFungible.signAndSend(account);

    return(hash.toHex());
  }


  @Post('/tokenFungible/burn')
  async burn() {
    const token_fungible_id = 2 ;
    const amount = 1000000 ;

    const api = await environment_api();
    const account = await environment_account();

    const tokenFungible = await api.tx.tokenFungible.burn(token_fungible_id,amount);
    const hash = await tokenFungible.signAndSend(account);

    return(hash.toHex());
  }

  @Post('/tokenFungible/create_token')
  async create_token() {
    const token_fungible_id = 3;
    const name = 'abel';
    const symbol = 'ABEL';
    const baseUri = 0;

    const api = await environment_api();
    const account = await environment_account();


    const tokenFungible = await api.tx.tokenFungible.createToken(token_fungible_id,name,symbol,baseUri);
    const hash = await tokenFungible.signAndSend(account);

    return (hash.toHex());
  }

  @Post('/tokenFungible/mint')
  async mint() {
    const token_fungible_id = 2 ;
    const mint_to_account = "5Eeh22xf25G6qtgFhBZJYCorYKPVVtQKGkLUd9RQLYfcruhb"
    const amount = 1000000 ;

    const api = await environment_api();
    const account = await environment_account();

    const tokenFungible = await api.tx.tokenFungible.mint(token_fungible_id,mint_to_account,amount);
    const hash = await tokenFungible.signAndSend(account);

    return(hash.toHex());
  }



  @Post('/tokenFungible/transfer')
  async transfer() {
    const token_fungible_id = 5 ;
    const recipient_to_account = "5Eeh22xf25G6qtgFhBZJYCorYKPVVtQKGkLUd9RQLYfcruhb"
    const amount = 1000000 ;

    const api = await environment_api();
    const account = await environment_account();

    const tokenFungible = await api.tx.tokenFungible.transfer(token_fungible_id,recipient_to_account,amount);
    const hash = await tokenFungible.signAndSend(account);

    return(hash.toHex());
  }

  @Post('/tokenFungible/transferFrom')
  async transferFrom() {
    const token_fungible_id = 5 ;
    const sender_to_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const recipient_to_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const amount = 1000000 ;

    const api = await environment_api();
    const account = await environment_account();

    const tokenFungible = await api.tx.tokenFungible.transferFrom(token_fungible_id,sender_to_account,recipient_to_account,amount);
    const hash = await tokenFungible.signAndSend(account);

    return(hash.toHex());
  }

  //tokenNonFungible

  @Post('/tokenNonFungible/createToken')
  async NFT_createToken() {
    const token_NonFungible_id = 1 ;
    const nft_name = "abel"
    const symbol = "ABEL"
    const baseUri = "Abel" ;

    const api = await environment_api();
    const account = await environment_account();

    const tokenNonFungible = await api.tx.tokenNonFungible.createToken(token_NonFungible_id,nft_name,symbol,baseUri);
    const hash = await tokenNonFungible.signAndSend(account);

    return(hash.toHex());
  }

  @Post('/tokenNonFungible/mint')
  async NFT_mint() {
    const token_NonFungible_id = 1 ;
    const to_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const tokenId = 1

    const api = await environment_api();
    const account = await environment_account();

    const tokenNonFungible = await api.tx.tokenNonFungible.mint(token_NonFungible_id,to_account,tokenId);
    const hash = await tokenNonFungible.signAndSend(account);

    return(hash.toHex());
  }

  @Post('/tokenNonFungible/approve')
  async NFT_approve() {
    const token_NonFungible_id = 1 ;
    const to_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const tokenId = 1

    const api = await environment_api();
    const account = await environment_account();

    const tokenNonFungible = await api.tx.tokenNonFungible.approve(token_NonFungible_id,to_account,tokenId);
    const hash = await tokenNonFungible.signAndSend(account);

    return(hash.toHex());

  }


  @Post('/tokenNonFungible/burn')
  async NFT_burn() {
    const token_NonFungible_id = 1 ;
    const tokenId = 1

    const api = await environment_api();
    const account = await environment_account();

    const tokenNonFungible = await api.tx.tokenNonFungible.burn(token_NonFungible_id,tokenId);
    const hash = await tokenNonFungible.signAndSend(account);

    return(hash.toHex());
  }

  @Post('/tokenNonFungible/setApproveForAll')
  async NFT_setApproveForAll() {
    const token_NonFungible_id = 1 ;
    const operator_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const approved = true

    const api = await environment_api();
    const account = await environment_account();

    const tokenNonFungible = await api.tx.tokenNonFungible.setApproveForAll(token_NonFungible_id,operator_account,approved);
    const hash = await tokenNonFungible.signAndSend(account);

    return(hash.toHex());
  }


  @Post('/tokenNonFungible/transferFrom')
  async NFT_transferFrom() {
    const token_NonFungible_id = 1 ;
    const form_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const to_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const tokenId = 1

    const api = await environment_api();
    const account = await environment_account();

    const tokenNonFungible = await api.tx.tokenNonFungible.transferFrom(token_NonFungible_id,form_account,to_account,tokenId);
    const hash = await tokenNonFungible.signAndSend(account);

    return(hash.toHex());
  }


  //tokenMulti

  @Post("/tokenMulti/createToken")
  async Multi_createToken (){
    const token_Multi_id = 1 ;
    const uri = "312312313"


    const  api = await  environment_api();
    const  account = await environment_account();

    const tokenMulti = await api.tx.tokenMulti.createToken(token_Multi_id,uri)
    const hash = await  tokenMulti.signAndSend(account);

    return(hash.toHex())
  }

  @Post("/tokenMulti/mint")
  async Multi_mint (){
    const token_Multi_id = 1 ;
    const to_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT";
    const tokenId = 1
    const amount = 1000000

    const  api = await  environment_api();
    const  account = await environment_account();

    const tokenMulti = await api.tx.tokenMulti.mint(token_Multi_id,to_account,tokenId,amount)
    const hash = await  tokenMulti.signAndSend(account);

    return(hash.toHex())
  }

  @Post("/tokenMulti/mintBatch")
  async Multi_mintBatch (){
    const token_Multi_id = 1 ;
    const to_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT";
    const tokenIds = 1
    const amounts = 1000000

    const  api = await  environment_api();
    const  account = await environment_account();

    const tokenMulti = await api.tx.tokenMulti.mintBatch(token_Multi_id,to_account,tokenIds,amounts)
    const hash = await  tokenMulti.signAndSend(account);

    return(hash.toHex())
  }

  @Post("/tokenMulti/burn")
  async Multi_burn (){
    const token_Multi_id = 1 ;
    const tokenId = 1
    const amount = 1000000

    const  api = await  environment_api();
    const  account = await environment_account();

    const tokenMulti = await api.tx.tokenMulti.burn(token_Multi_id,tokenId,amount)
    const hash = await  tokenMulti.signAndSend(account);

    return(hash.toHex())
  }

  @Post("/tokenMulti/burnBatch")
  async Multi_burnBatch (){
    const token_Multi_id = 1 ;
    const tokenIds = 1
    const amounts = 1000000

    const  api = await  environment_api();
    const  account = await environment_account();

    const tokenMulti = await api.tx.tokenMulti.burnBatch(token_Multi_id,tokenIds,amounts)
    const hash = await  tokenMulti.signAndSend(account);

    return(hash.toHex())
  }

  @Post("/tokenMulti/batchTransferFrom")
  async Multi_batchTransferFrom (){
    const token_Multi_id = 1 ;
    const form_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const to_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const tokenIds = 1
    const amounts = 1000000

    const  api = await  environment_api();
    const  account = await environment_account();

    const tokenMulti = await api.tx.tokenMulti.batchTransferFrom(token_Multi_id,form_account,to_account,tokenIds,amounts)
    const hash = await  tokenMulti.signAndSend(account);

    return(hash.toHex())
  }

  @Post("/tokenMulti/setApprovalForAll")
  async Multi_setApprovalForAll (){
    const token_Multi_id = 1 ;
    const operator_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const approved = true

    const  api = await  environment_api();
    const  account = await environment_account();

    const tokenMulti = await api.tx.tokenMulti.setApprovalForAll(token_Multi_id,operator_account,approved)
    const hash = await  tokenMulti.signAndSend(account);

    return(hash.toHex())
  }

  @Post("/tokenMulti/transferFrom")
  async Multi_transferFrom (){
    const token_Multi_id = 1 ;
    const form_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const to_account = "5GQXPhYodnaWLk4MxSsFqjCYhrZwwkbbiSU8fpDRdBU6V7bT"
    const tokenId = 1
    const amount = 1000000

    const  api = await  environment_api();
    const  account = await environment_account();

    const tokenMulti = await api.tx.tokenMulti.transferFrom(token_Multi_id,form_account,to_account,tokenId,amount)
    const hash = await  tokenMulti.signAndSend(account);

    return(hash.toHex())
  }




  //
  // @Get('/get_users')
  // async getUsers(@Query() queryData) {
  //   console.log(queryData);
  //   const user = await this.usersService.findUsers();
  //   return { success: true, message: 'OK', data: user };
  // }
  //
  // @Post('/login')
  // async addUser() {
  //   const user = await this.usersService.saveUser();
  //   console.log(user);
  // }
  //
  // @Post('/update')
  // async UpdateUsers() {
  //   const user = await this.usersService.UpdateUsers();
  //   console.log(user);
  // }
  //
  // @Post('/remove')
  // async RemoveUsers() {
  //   const user = await this.usersService.RemoveUsers();
  //   console.log(user);
  // }
}
