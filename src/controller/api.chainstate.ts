import { Inject, Controller, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { ApiPromise, WsProvider } from '@polkadot/api';


const {WSS_NETWORK} = process.env;

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
  @Get('/tokenFungible/get_balance')
  async get_balance(@Query() queryData) {
    const token_fungible_id = queryData.token_fungible_id;
    const account_address = queryData.account_address;

    const api = await environment_api();

    const tokenFungible_balance = await api.query.tokenFungible.balances(token_fungible_id,account_address);

    return (tokenFungible_balance.toString());
  }

  @Get('/tokenFungible/get_tokens')
  async get_token(@Query() queryData) {
    const token_info = queryData.token_info;

    const api = await environment_api();

    const tokenFungible_tokens = await api.query.tokenFungible.tokens(token_info);

    return (tokenFungible_tokens.toString());
  }

  @Get('/tokenFungible/get_allowances')
  async get_allowances(@Query() queryData) {
    const tokenID = queryData.tokenID;
    const form_account = queryData.form_account;
    const to_account = queryData.to_account;

    const api = await environment_api();

    const tokenFungible_allowances = await api.query.tokenFungible.allowances(tokenID,[form_account,to_account]);

    return (tokenFungible_allowances.toString());
  }

  //tokenNonFungible

  @Get('/tokenNonFungible/get_allTokens')
  async get_NFT_allTokens(@Query() queryData) {
    const token1 = queryData.token1;
    const token2 = queryData.token2;

    const api = await environment_api();

    const tokenNonFungible_allTokens = await api.query.tokenNonFungible.allTokens(token1,token2);

    return (tokenNonFungible_allTokens.toString());
  }

  @Get('/tokenNonFungible/get_allTokensIndex')
  async get_NFT_allTokensIndex(@Query() queryData) {
    const token1 = queryData.token1;
    const token2 = queryData.token2;

    const api = await environment_api();

    const tokenNonFungible_allTokensIndex = await api.query.tokenNonFungible.allTokensIndex(token1,token2);

    return (tokenNonFungible_allTokensIndex.toString());
  }


  @Get('/tokenNonFungible/get_balances')
  async get_NFT_balances(@Query() queryData) {
    const tokenID = queryData.tokenID;
    const account_address = queryData.account_address;

    const api = await environment_api();

    const tokenNonFungible_balances = await api.query.tokenNonFungible.balances(tokenID,account_address);

    return (tokenNonFungible_balances.toString());
  }


  @Get('/tokenNonFungible/get_operatorApprovals')
  async get_NFT_operatorApprovals(@Query() queryData) {
    const tokenID = queryData.tokenID;
    const form_account = queryData.form_account;
    const to_account = queryData.to_account;

    const api = await environment_api();

    const tokenNonFungible_operatorApprovals = await api.query.tokenNonFungible.operatorApprovals(tokenID,[form_account,to_account]);

    return (tokenNonFungible_operatorApprovals.toString());
  }

  @Get('/tokenNonFungible/get_ownedTokens')
  async get_NFT_ownedTokens(@Query() queryData) {
    const tokenID = queryData.tokenID;
    const account_address = queryData.form_account;
    const token2 = queryData.token2;

    const api = await environment_api();

    const tokenNonFungible_ownedTokens = await api.query.tokenNonFungible.ownedTokens(tokenID,[account_address,token2]);

    return (tokenNonFungible_ownedTokens.toString());
  }


  @Get('/tokenNonFungible/get_ownedTokensIndex')
  async get_NFT_ownedTokensIndex(@Query() queryData) {
    const token1 = queryData.token1;
    const token2 = queryData.token2;

    const api = await environment_api();

    const tokenNonFungible_ownedTokensIndex = await api.query.tokenNonFungible.ownedTokensIndex(token1,token2);

    return (tokenNonFungible_ownedTokensIndex.toString());

  }

  @Get('/tokenNonFungible/get_owners')
  async get_NFT_owners(@Query() queryData) {
    const token1 = queryData.token1;
    const token2 = queryData.token2;

    const api = await environment_api();

    const tokenNonFungible_owners = await api.query.tokenNonFungible.owners(token1,token2);

    return (tokenNonFungible_owners.toString());

  }


  //tokenMulti

  @Get('/tokenMulti/get_balances')
  async get_balances(@Query() queryData) {
    const token1 = queryData.token1;
    const token2 = queryData.token2;
    const account_address = queryData.account_address

    const api = await environment_api();

    const tokenMulti_balances = await api.query.tokenMulti.balances(token1,[token2,account_address]);

    return (tokenMulti_balances.toString());

  }

  @Get('/tokenMulti/get_operatorApprovals')
  async get_operatorApprovals(@Query() queryData) {
    const tokenID = queryData.tokenID;
    const form_account = queryData.form_account;
    const to_account = queryData.to_account;

    const api = await environment_api();

    const tokenMulti_operatorApprovals = await api.query.tokenMulti.operatorApprovals(tokenID,[form_account,to_account]);

    return (tokenMulti_operatorApprovals.toString());

  }

  @Get('/tokenMulti/get_tokens')
  async get_tokens(@Query() queryData) {
    const tokenID = queryData.tokenID;

    const api = await environment_api();

    const tokenMulti_operatorApprovals = await api.query.tokenMulti.tokens(tokenID);

    return (tokenMulti_operatorApprovals.toString());

  }





}
