import { MissingParamError, CustomerModel, UpdateCustomer, UpdateCustomerModel } from './update-customer-protocols'
import { LoadCustomerByIdController } from './update-customer'

const makeUpdateCostumer = (): UpdateCustomer => {
  class UpdateCustomerStub implements UpdateCustomer {
    async update (data: UpdateCustomerModel): Promise<CustomerModel> {
      const fakeCustomer = {
        id: 'customer-id',
        document: 12345,
        name: 'customer-name'
      }
      return await new Promise((resolve) => resolve(fakeCustomer))
    }
  }
  return new UpdateCustomerStub()
}

interface SutTypes{
  sut: LoadCustomerByIdController
  updateCustomerStub: UpdateCustomer
}

const makeSut = (): SutTypes => {
  const updateCustomerStub = makeUpdateCostumer()
  const sut = new LoadCustomerByIdController(updateCustomerStub)
  return {
    sut,
    updateCustomerStub
  }
}

const expectedHttpRequest = {
  params: {
    id: 'customer-id'
  },
  body: {
    document: 12345,
    name: 'customer-name'
  }
}

describe('Update Customer Controller', () => {
  test('Should return 400 if no document is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'customer_id'
      },
      body: {
        name: 'customer-name'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('document').message)
  })

  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'customer_id'
      },
      body: {
        document: 12345
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('name').message)
  })

  test('Should return 400 if no id is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {

      },
      body: {
        document: 12345,
        name: 'customer-name'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('id').message)
  })

  test('Should call addCustomer with correct values', async () => {
    const { sut, updateCustomerStub } = makeSut()
    const updateSpy = jest.spyOn(updateCustomerStub, 'update')
    await sut.handle(expectedHttpRequest)
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'customer-id',
      document: 12345,
      name: 'customer-name'
    })
  })

  test('Should update a customer on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(expectedHttpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      id: 'customer-id',
      document: 12345,
      name: 'customer-name'
    })
  })

  test('Should return serverError if updateCustomer throws', async () => {
    const { sut, updateCustomerStub } = makeSut()
    jest.spyOn(updateCustomerStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.handle(expectedHttpRequest)
    expect(response.statusCode).toBe(500)
  })
})
