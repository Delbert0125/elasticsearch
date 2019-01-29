'use strict'

/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */

function buildMlGetRecords (opts) {
  // eslint-disable-next-line no-unused-vars
  const { makeRequest, ConfigurationError, result } = opts
  /**
   * Perform a [ml.get_records](http://www.elastic.co/guide/en/elasticsearch/reference/current/ml-get-record.html) request
   *
   * @param {string} job_id -
   * @param {boolean} exclude_interim - Exclude interim results
   * @param {int} from - skips a number of records
   * @param {int} size - specifies a max number of records to get
   * @param {string} start - Start time filter for records
   * @param {string} end - End time filter for records
   * @param {double} record_score -
   * @param {string} sort - Sort records by a particular field
   * @param {boolean} desc - Set the sort direction
   * @param {object} body - Record selection criteria
   */

  const acceptedQuerystring = [
    'exclude_interim',
    'from',
    'size',
    'start',
    'end',
    'record_score',
    'sort',
    'desc'
  ]

  const snakeCase = {
    excludeInterim: 'exclude_interim',
    recordScore: 'record_score'

  }

  return function mlGetRecords (params, options, callback) {
    options = options || {}
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    if (typeof params === 'function' || params == null) {
      callback = params
      params = {}
      options = {}
    }
    // promises support
    if (callback == null) {
      return new Promise((resolve, reject) => {
        mlGetRecords(params, options, (err, body) => {
          err ? reject(err) : resolve(body)
        })
      })
    }

    // check required parameters
    if (params['job_id'] == null && params['jobId'] == null) {
      return callback(
        new ConfigurationError('Missing required parameter: job_id or jobId'),
        result
      )
    }

    // validate headers object
    if (options.headers != null && typeof options.headers !== 'object') {
      return callback(
        new ConfigurationError(`Headers should be an object, instead got: ${typeof options.headers}`),
        result
      )
    }

    var warnings = null
    var { method, body, jobId, job_id } = params
    var querystring = semicopy(params, ['method', 'body', 'jobId', 'job_id'])

    if (method == null) {
      method = body == null ? 'GET' : 'POST'
    }

    var ignore = options.ignore || null
    if (typeof ignore === 'number') {
      ignore = [ignore]
    }

    var path = ''

    path = '/' + '_ml' + '/' + 'anomaly_detectors' + '/' + encodeURIComponent(job_id || jobId) + '/' + 'results' + '/' + 'records'

    // build request object
    const request = {
      method,
      path,
      body: body || '',
      querystring
    }

    const requestOptions = {
      ignore,
      requestTimeout: options.requestTimeout || null,
      maxRetries: options.maxRetries || null,
      asStream: options.asStream || false,
      headers: options.headers || null,
      warnings
    }

    return makeRequest(request, requestOptions, callback)

    function semicopy (obj, exclude) {
      var target = {}
      var keys = Object.keys(obj)
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i]
        if (exclude.indexOf(key) === -1) {
          target[snakeCase[key] || key] = obj[key]
          if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
            warnings = warnings || []
            warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
          }
        }
      }
      return target
    }
  }
}

module.exports = buildMlGetRecords
