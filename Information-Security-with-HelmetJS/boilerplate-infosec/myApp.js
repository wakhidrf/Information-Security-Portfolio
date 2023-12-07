const express = require('express');
const app = express();

// Require helmet in your app
const helmet = require('helmet');

// Use helmet.hidePoweredBy() middleware
// app.use(helmet.hidePoweredBy());

// Use helmet.frameguard() with the configuration object {action: 'deny'}
// app.use(helmet.frameguard({action: 'deny'}));

// Use helmet.xssFilter() middleware
// app.use(helmet.xssFilter());

// Use helmet.noSniff() middleware
// app.use(helmet.noSniff());

// Use helmet.ieNoOpen() middleware
// app.use(helmet.ieNoOpen());

// Create a variable for 90 days in seconds
// const ninetyDaysInSeconds = 90*24*60*60;

// Use helmet.hsts() with the config object
// app.use(helmet.hsts({
  // maxAge: ninetyDaysInSeconds,
  // force: true
// }));

// Use helmet.dnsPrefetchControl() middleware
// app.use(helmet.dnsPrefetchControl());

// Use helmet.dnsPrefetchControl() middleware with an option
// app.use(helmet.dnsPrefetchControl({ allow: true }));

// Use helmet.noCache() middleware
// app.use(helmet.noCache());

// Use helmet.contentSecurityPolicy() with the directives object
// app.use(helmet.contentSecurityPolicy({
  // directives: {
    // defaultSrc: ["'self'"], // trust only your website address by default
    // scriptSrc: ["'self'", "trusted-cdn.com"] // allow scripts from your website and trusted-cdn.com
  // }
// }));

app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
