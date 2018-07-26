/* global expect, describe, it */
const routes = require('../routes')
const stubs = require('./stubs')
const { fakeBanana } = require('./stubs')

jest.mock('../../services/repository', () => () => {
    const { fake, fakeBanana } = require('./stubs')
    return {
      getAllRegistry: jest.fn(() => fakeBanana)
      // create: jest.fn(() => fake),
      // getByID: jest.fn(() => fake),
      // purge: jest.fn(() => fake),
      // remove: jest.fn(() => fake),
      // update: jest.fn(() => fake)
    }
})

describe('operations routes', () => {
  it('returns all banana coins', async () => {
    const req = stubs.createReq()
    const res = stubs.createRes()

    await routes.getAllBananas(req, res)

    expect(res.send).toHaveBeenCalledWith({
      links: {
        self: "http://localhost:1337/banana-coin"
      },
      data: fakeBanana,
      included: {
        type: "object"
      }
    })
  })
})
