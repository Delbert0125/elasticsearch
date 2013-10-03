var _ = require('../lib/toolbelt')
  , paramHelper = require('../lib/param_helper');

var searchTypeOptions = ['query_then_fetch', 'query_and_fetch', 'dfs_query_then_fetch', 'dfs_query_and_fetch', 'count', 'scan'];



/**
 * Perform an elasticsearch [msearch](http://www.elasticsearch.org/guide/reference/api/multi-search/) request
 *
 * @for Client
 * @method msearch
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.search_type - Search operation type
 */
function doMsearch(params, callback) {
  params = params || {};

  var request = {
      ignore: params.ignore,
      body: paramHelper.bulkBody(params.body, this.client.serializer) || null
    }
    , url = {}
    , query = {}
    , responseOpts = {};
    
  if (params.method = _.toLowerString(params.method)) {
    if (params.method === 'get' || params.method === 'post') {
      request.method = params.method;
    } else {
      throw new TypeError('Invalid method: should be one of get, post');
    }
  } else {
    request.method = params.body ? 'post' : 'get';
  }

  // find the url's params
  if (typeof params.index !== 'undefined') {
    switch (typeof params.index) {
    case 'string':
      url.index = params.index;
      break;
    case 'object':
      if (_.isArray(params.index)) {
        url.index = params.index.join(',');
      } else {
        throw new TypeError('Invalid index: ' + params.index + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      url.index = !!params.index;
    }
  }
  
  if (typeof params.type !== 'undefined') {
    switch (typeof params.type) {
    case 'string':
      url.type = params.type;
      break;
    case 'object':
      if (_.isArray(params.type)) {
        url.type = params.type.join(',');
      } else {
        throw new TypeError('Invalid type: ' + params.type + ' should be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      url.type = !!params.type;
    }
  }
  

  // build the url
  if (url.hasOwnProperty('index') && url.hasOwnProperty('type')) {
    request.url = '/' + encodeURIComponent(url.index) + '/' + encodeURIComponent(url.type) + '/_msearch';
  }
  else if (url.hasOwnProperty('index')) {
    request.url = '/' + encodeURIComponent(url.index) + '/_msearch';
  }
  else {
    request.url = '/_msearch';
  }
  

  // build the query string
  if (typeof params.search_type !== 'undefined') {
    if (_.contains(searchTypeOptions, params.search_type)) {
      query.search_type = params.search_type;
    } else {
      throw new TypeError(
        'Invalid search_type: ' + params.search_type +
        ' should be one of ' + searchTypeOptions.join(', ') + '.'
      );
    }
  }
  
  request.url = request.url + _.makeQueryString(query);

  var reqPromise = this.client.request(request);
  if (callback) {
    reqPromise.then(_.bind(callback, null, null), callback);
  }
  return reqPromise;
}

module.exports = doMsearch;
