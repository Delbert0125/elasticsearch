// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

const { handleError, snakeCaseKeys, normalizeArguments, kConfigurationError } = require('../utils')
const acceptedQuerystring = ['scroll', 'scroll_id', 'rest_total_hits_as_int', 'pretty', 'human', 'error_trace', 'source', 'filter_path']
const snakeCase = { scrollId: 'scroll_id', restTotalHitsAsInt: 'rest_total_hits_as_int', errorTrace: 'error_trace', filterPath: 'filter_path' }

function scrollApi (params, options, callback) {
  ;[params, options, callback] = normalizeArguments(params, options, callback)

  var { method, body, scrollId, scroll_id, ...querystring } = params
  querystring = snakeCaseKeys(acceptedQuerystring, snakeCase, querystring)

  var path = ''
  if ((scroll_id || scrollId) != null) {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_search' + '/' + 'scroll' + '/' + encodeURIComponent(scroll_id || scrollId)
  } else {
    if (method == null) method = body == null ? 'GET' : 'POST'
    path = '/' + '_search' + '/' + 'scroll'
  }

  // build request object
  const request = {
    method,
    path,
    body: body || '',
    querystring
  }

  return this.transport.request(request, options, callback)
}

module.exports = scrollApi
