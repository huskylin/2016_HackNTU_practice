const Koa = require('Koa');
const views = require('koa-views');
const serve = require('koa-static');
const logger = require('koa-logger');
const router = require('./app/router');

const path = require('path');

const app = new Koa;

// Show all request, include path, status code and spent time.
app.use(logger());

// Parse post form as json.
// app.use(bodyParser());

// Use ejs as template engines.
app.use(views(path.join(__dirname, '/views'), {
  map: { ejs: 'ejs' }
}));

// Serve static files in "public" directory.
app.use(serve(path.join(__dirname, '/public')));


// Catch all unhandled server internal errors and display message.
//app.env = 'product';
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;

    // Show message to server side.
    console.log(err);

    // Show message to client side.
    // NOTE: THis only enable when in "development" env.
    // Get rid of this feature, set app.env = "product".
    if ('development' === app.env) {
      switch (ctx.accepts('html', 'json')) {
        case 'html':
          ctx.type = 'html';
          ctx.body = `<p>${err.message}</p>`;
          break;
        case 'json':
          ctx.type = 'json';
          ctx.body = { message: err.message };
          break;
        default:
          ctx.type = 'text';
          ctx.body = err.message;
      }
    } else {
      switch (ctx.accepts('html', 'json')) {
        case 'html':
          ctx.type = 'html';
          ctx.body = '<p>Server Internal Error</p>';
          break;
        case 'json':
          ctx.type = 'json';
          ctx.body = { message: 'Server Internal Error' };
          break;
        default:
          ctx.type = 'text';
          ctx.body = 'Server Internal Error';
      }
    }
  }
});

// 404 Not Found Page.
app.use(async (ctx, next) => {
  await next();

  if (404 !== ctx.status)
    return;
  ctx.status = 404;

  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p>404 Page Not Found</p>';
      break;
    case 'json':
      ctx.type = 'json';
      ctx.body = { message: '404 Page Not Found' };
      break;
    default:
      ctx.type = 'text';
      ctx.body = '404 Page Not Found';
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = 8080;

app.listen(port, () => {
  console.log(`Server start listening on port ${port}`);
});
