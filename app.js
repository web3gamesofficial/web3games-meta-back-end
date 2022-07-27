const WebFramework = require('@midwayjs/koa').Framework;
const { Bootstrap } = require('@midwayjs/bootstrap');

/**
 * serverless need to add this code
 */
module.exports = async () => {
  console.log('start serve');
  // start
  await Bootstrap.run();
  // get container
  const container = Bootstrap.getApplicationContext();
  // get koa framework
  const framework = container.get(WebFramework);
  // return app object
  return framework.getApplication();
};
