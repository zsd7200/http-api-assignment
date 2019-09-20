// all necessary requires
const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// urlStruct to handle page requests
const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.getSuccess,
    '/badRequest': jsonHandler.getBadRequest,
    '/unauthorized': jsonHandler.getUnauthorized,
    '/forbidden': jsonHandler.getForbidden,
    '/internal': jsonHandler.getInternal,
    '/notImplemented': jsonHandler.getNotImplemented,
    notFound: jsonHandler.notFound,
  },
};


// function to handle requests
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query); // needed for checking valid and loggedIn params
  const acceptedTypes = request.headers.accept.split(','); // needed to check for xml or json

  // call correct urlStruct method if exists
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct[request.method].notFound(request, response, acceptedTypes);
  }
};

// start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
