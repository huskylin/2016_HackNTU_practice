const router = require('koa-router')();
const request = require('request');

// This is data.taipei API url. Send back json format data.
const apiUrl = 'http://data.taipei/opendata/datalist/apiAccess?scope=datasetMetadataSearch&q=id:94952b92-5e00-4b0a-a4b1-a3c793c216b6';

// Main page.
router.get('/', async ctx => {
  await ctx.render('index.ejs');
});

// This API is used to bypass data.taipei ajax rejection.
router.get('/api', async ctx => {
  ctx.body = await requestApi(apiUrl);
});

// Take an api url and return a promise that resolve response body.
function requestApi(apiUrl) {
  return new Promise((resolve, reject) => {
    request(apiUrl, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject();
      }
    });
  });
}

module.exports = router;
