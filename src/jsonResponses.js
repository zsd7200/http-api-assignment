// variables to make calling respond a little easier
const json = 'application/json';
const xml = 'text/xml';

// respond method--basically respondJSON but more flexible
const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
  
  // print object to console afterward
  console.dir(object);
};

// success message
const getSuccess = (request, response, acceptedTypes) => {
  
  // create responseJSON since either way I can use this message
  const responseJSON = {
    message: 'This is a successful response.',
  };

  // check if acceptedType is xml and respond appropriately
  if (acceptedTypes[0] === xml) {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, xml);
  }

  // otherwise respond with JSON
  return respond(request, response, 200, JSON.stringify(responseJSON), json);
};

// bad request message
const getBadRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // check for valid param
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';

    if (acceptedTypes[0] === xml) {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 400, responseXML, xml);
    }

    return respond(request, response, 400, JSON.stringify(responseJSON), json);
  }

  if (acceptedTypes[0] === xml) {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, xml);
  }

  return respond(request, response, 200, JSON.stringify(responseJSON), json);
};

// unauthorized message
const getUnauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // check for loggedIn param
  if (!params.loggedIn || params.loggedIn !== 'true') {
    responseJSON.message = 'Missing loggedIn query parameter set to true';
    responseJSON.id = 'unauthorized';

    if (acceptedTypes[0] === xml) {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      return respond(request, response, 401, responseXML, xml);
    }

    return respond(request, response, 401, JSON.stringify(responseJSON), json);
  }

  if (acceptedTypes[0] === xml) {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    // responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 200, responseXML, xml);
  }

  return respond(request, response, 200, JSON.stringify(responseJSON), json);
};

// forbidden message
const getForbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === xml) {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 403, responseXML, xml);
  }

  return respond(request, response, 403, JSON.stringify(responseJSON), json);
};

// internal error message
const getInternal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  if (acceptedTypes[0] === xml) {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 500, responseXML, xml);
  }

  return respond(request, response, 500, JSON.stringify(responseJSON), json);
};

// not implemented message
const getNotImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === xml) {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 501, responseXML, xml);
  }

  return respond(request, response, 501, JSON.stringify(responseJSON), json);
};

// not found message
const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (acceptedTypes[0] === xml) {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(request, response, 404, responseXML, xml);
  }

  return respond(request, response, 404, JSON.stringify(responseJSON), json);
};

// export methods
module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  notFound,
};
