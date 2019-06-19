'use strict';

let API_URLS = {
  exchange: `https://exchange.phnx.dev/v1`,
  none: ``
};

const $ = (options) => {
  let request = new XMLHttpRequest(),
    params = options.params || { },
    body = options.body || { },
    success = options.success || (() => { }),
    error = options.error || (() => { }),
    paramString,
    API_URL = API_URLS[options.api || `none`];

  if (Object.keys(params).length > 0) {
    paramString = `?${ Object.keys(params)
      .filter((opt) => params[opt] !== undefined && params[opt] !== null)
      .map((opt) => {
        return `${ opt }=${ params[opt] }`;
      }).join(`&`) }`;
  } else {
    paramString = ``;
  }

  request.onreadystatechange = () => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status.toString()[0] === `2` && !request._hasError) {
      let responseText = request.responseText.length > 0 ? JSON.parse(request.responseText) : { };

      success(responseText);
    } else {
      error();
    }
  };

  request.open(
    options.type || `GET`,
    `${ API_URL }${ options.url }${ paramString }`
  );

  request.setRequestHeader(`Content-Type`, `application/json`);

  request.send(JSON.stringify(body) || undefined);
};

export { $ };
