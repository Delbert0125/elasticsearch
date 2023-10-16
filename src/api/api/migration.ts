/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-misused-new */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unused-vars */

// This file was automatically generated by elastic/elastic-client-generator-js
// DO NOT MODIFY IT BY HAND. Instead, modify the source open api file,
// and elastic/elastic-client-generator-js to regenerate this file again.

import {
  Transport,
  TransportRequestOptions,
  TransportRequestOptionsWithMeta,
  TransportRequestOptionsWithOutMeta,
  TransportResult
} from '@elastic/transport'
import * as T from '../types'
import * as TB from '../typesWithBodyKey'
interface That { transport: Transport }

export default class Migration {
  transport: Transport
  constructor (transport: Transport) {
    this.transport = transport
  }

  /**
    * Retrieves information about different cluster, node, and index level settings that use deprecated features that will be removed or changed in the next major version.
    * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/8.11/migration-api-deprecation.html | Elasticsearch API documentation}
    */
  async deprecations (this: That, params?: T.MigrationDeprecationsRequest | TB.MigrationDeprecationsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationDeprecationsResponse>
  async deprecations (this: That, params?: T.MigrationDeprecationsRequest | TB.MigrationDeprecationsRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.MigrationDeprecationsResponse, unknown>>
  async deprecations (this: That, params?: T.MigrationDeprecationsRequest | TB.MigrationDeprecationsRequest, options?: TransportRequestOptions): Promise<T.MigrationDeprecationsResponse>
  async deprecations (this: That, params?: T.MigrationDeprecationsRequest | TB.MigrationDeprecationsRequest, options?: TransportRequestOptions): Promise<any> {
    const acceptedPath: string[] = ['index']
    const querystring: Record<string, any> = {}
    const body = undefined

    params = params ?? {}
    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body') {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    let method = ''
    let path = ''
    if (params.index != null) {
      method = 'GET'
      path = `/${encodeURIComponent(params.index.toString())}/_migration/deprecations`
    } else {
      method = 'GET'
      path = '/_migration/deprecations'
    }
    return await this.transport.request({ path, method, querystring, body }, options)
  }

  /**
    * Find out whether system features need to be upgraded or not
    * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/8.11/migration-api-feature-upgrade.html | Elasticsearch API documentation}
    */
  async getFeatureUpgradeStatus (this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest | TB.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationGetFeatureUpgradeStatusResponse>
  async getFeatureUpgradeStatus (this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest | TB.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.MigrationGetFeatureUpgradeStatusResponse, unknown>>
  async getFeatureUpgradeStatus (this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest | TB.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptions): Promise<T.MigrationGetFeatureUpgradeStatusResponse>
  async getFeatureUpgradeStatus (this: That, params?: T.MigrationGetFeatureUpgradeStatusRequest | TB.MigrationGetFeatureUpgradeStatusRequest, options?: TransportRequestOptions): Promise<any> {
    const acceptedPath: string[] = []
    const querystring: Record<string, any> = {}
    const body = undefined

    params = params ?? {}
    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body') {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'GET'
    const path = '/_migration/system_features'
    return await this.transport.request({ path, method, querystring, body }, options)
  }

  /**
    * Begin upgrades for system features
    * @see {@link https://www.elastic.co/guide/en/elasticsearch/reference/8.11/migration-api-feature-upgrade.html | Elasticsearch API documentation}
    */
  async postFeatureUpgrade (this: That, params?: T.MigrationPostFeatureUpgradeRequest | TB.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MigrationPostFeatureUpgradeResponse>
  async postFeatureUpgrade (this: That, params?: T.MigrationPostFeatureUpgradeRequest | TB.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptionsWithMeta): Promise<TransportResult<T.MigrationPostFeatureUpgradeResponse, unknown>>
  async postFeatureUpgrade (this: That, params?: T.MigrationPostFeatureUpgradeRequest | TB.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptions): Promise<T.MigrationPostFeatureUpgradeResponse>
  async postFeatureUpgrade (this: That, params?: T.MigrationPostFeatureUpgradeRequest | TB.MigrationPostFeatureUpgradeRequest, options?: TransportRequestOptions): Promise<any> {
    const acceptedPath: string[] = []
    const querystring: Record<string, any> = {}
    const body = undefined

    params = params ?? {}
    for (const key in params) {
      if (acceptedPath.includes(key)) {
        continue
      } else if (key !== 'body') {
        // @ts-expect-error
        querystring[key] = params[key]
      }
    }

    const method = 'POST'
    const path = '/_migration/system_features'
    return await this.transport.request({ path, method, querystring, body }, options)
  }
}
