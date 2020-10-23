import { assert } from 'chai'
import nock from 'nock'
import {
  CustomAuthenticatorResponseBody,
  gateway as MoltinGateway
} from '../../src/moltin'
import { storesArray as stores, keysArray as keys, account } from '../factories'

const apiUrl = 'https://api.moltin.com/v1'
const accessToken = 'testaccesstoken'
const auth = (): Promise<CustomAuthenticatorResponseBody> =>
  new Promise(resolve =>
    resolve({
      expires: 99999999999,
      access_token: accessToken
    })
  )

describe('Moltin accounts', () => {
  const Moltin = MoltinGateway({
    custom_authenticator: auth
  })

  it('should return an account', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .get('/accounts')
      .reply(200, { data: account })

    return Moltin.Accounts.All().then(response => {
      assert.propertyVal(response.data, 'id', '123')
    })
  })

  it('should return an array of stores', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .get('/accounts/stores')
      .reply(200, { data: stores })

    return Moltin.Accounts.Stores().then(response => {
      assert.lengthOf(response.data, 2)
    })
  })

  it('should return an a single store', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .get('/accounts/stores/store-1')
      .reply(200, { data: stores[0] })

    return Moltin.Accounts.Store('store-1').then(response => {
      assert.propertyVal(response.data, 'id', 'store-1')
    })
  })

  it('should switch store', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .get('/account/stores/switch/store-1')
      .reply(200, {
        data: {
          status: 200,
          title: 'Store switched successfully to: store-1'
        }
      })

    return Moltin.Accounts.SwitchStore('store-1').then(response => {
      assert.propertyVal(
        response.data,
        'title',
        'Store switched successfully to: store-1'
      )
    })
  })

  it('should return an array of keys', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .get('/accounts/keys')
      .reply(200, { data: keys })

    return Moltin.Accounts.Keys().then(response => {
      assert.lengthOf(response.data, 2)
    })
  })
})