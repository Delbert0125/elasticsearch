// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

/**
 * To run this generator you must have the
 * `alternatives_report.spec.json` placed in the root of this project.
 * To get the `alternatives_report.spec.json` you must run the script
 * to parse the original `alternatives_report.json`, which is not yet public
 * and lives in github.com/elastic/clients-team/tree/master/scripts/docs-json-generator
 *
 * This script will remove the content of the `docs/doc_examples` folder and generate
 * all the files present in the `enabledFiles` list below.
 * You can run it with the following command:
 *
 * ```bash
 *   $ node scripts/generate-docs-examples.js
 * ```
 */

const { join } = require('path')
const { writeFileSync } = require('fs')
const rimraf = require('rimraf')
const standard = require('standard')
const dedent = require('dedent')

const docsExamplesDir = join('docs', 'doc_examples')

const enabledFiles = [
  'docs/delete.asciidoc',
  'docs/get.asciidoc',
  'docs/index_.asciidoc',
  'getting-started.asciidoc',
  'query-dsl/query-string-query.asciidoc',
  'query-dsl.asciidoc',
  'search/request-body.asciidoc',
  'setup/install/check-running.asciidoc',
  'mapping.asciidoc',
  'query-dsl/query_filter_context.asciidoc',
  'query-dsl/bool-query.asciidoc',
  'query-dsl/match-query.asciidoc',
  'indices/create-index.asciidoc',
  'docs/index_.asciidoc',
  'aggregations/bucket/terms-aggregation.asciidoc',
  'query-dsl/range-query.asciidoc'
]

function generate () {
  rimraf.sync(join(docsExamplesDir, '*'))
  const examples = require(join(__dirname, '..', 'alternatives_report.spec.json'))
  for (const example of examples) {
    if (example.lang !== 'console') continue
    if (!enabledFiles.includes(example.source_location.file)) continue

    const asciidoc = generateAsciidoc(example.parsed_source)
    writeFileSync(
      join(docsExamplesDir, `${example.digest}.asciidoc`),
      asciidoc,
      'utf8'
    )
  }
}

function generateAsciidoc (source) {
  var asciidoc = '// This file is autogenerated, DO NOT EDIT\n'
  asciidoc += '// Use `node scripts/generate-docs-examples.js` to generate the docs examples\n\n'
  var code = 'async function run (client) {\n// START\n'

  for (var i = 0; i < source.length; i++) {
    const { api, query, params, body } = source[i]
    const apiArguments = Object.assign({}, params, query, body ? { body } : body)
    var serializedApiArguments = Object.keys(apiArguments).length > 0
      ? JSON.stringify(apiArguments, null, 2)
      : ''
    code += `const response${getResponsePostfix(i)} = await client.${api.replace(/_([a-z])/g, g => g[1].toUpperCase())}(${serializedApiArguments})
console.log(response${getResponsePostfix(i)})
\n`
  }

  code += '// END\n}'
  const { results } = standard.lintTextSync(code, { fix: true })
  code = results[0].output
  code = code.slice(code.indexOf('// START\n') + 9, code.indexOf('\n\n// END'))

  asciidoc += `[source, js]
----
${dedent(code)}
----

`
  return asciidoc

  function getResponsePostfix (i) {
    if (source.length === 1) return ''
    return String(i)
  }
}

generate()
