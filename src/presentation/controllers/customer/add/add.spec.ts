import { MissingParamError, AddCustomer, CreateCustomerModel, CustomerModel } from './add-protocols'
import { AddCustomerController } from './add'

const makeAddCustomerStub = (): AddCustomer => {
  class AddCustomerStub implements AddCustomer {
    async add (data: CreateCustomerModel): Promise<CustomerModel> {
      const fakeCustomer = {
        id: 'customer-id',
        document: 12345,
        name: 'customer-name'
      }
      return await new Promise((resolve) => resolve(fakeCustomer))
    }
  }
  return new AddCustomerStub()
}

interface SutTypes{
  sut: AddCustomerController
  addCustomerStub: AddCustomer
}

const makeSut = (): SutTypes => {
  const addCustomerStub = makeAddCustomerStub()
  const sut = new AddCustomerController(addCustomerStub)
  return {
    sut,
    addCustomerStub
  }
}

const expectedHttpRequest = {
  body: {
    document: 12345,
    name: 'customer-name'
  }
}

describe('Add Customer Controller', () => {
  test('Should return 400 if no document is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
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
      body: {
        document: 12345
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new MissingParamError('name').message)
  })

  test('Should call addCustomer with correct values', async () => {
    const { sut, addCustomerStub } = makeSut()
    const addSpy = jest.spyOn(addCustomerStub, 'add')
    await sut.handle(expectedHttpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      document: 12345,
      name: 'customer-name'
    })
  })

  test('Should create customer on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(expectedHttpRequest)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      id: 'customer-id',
      document: 12345,
      name: 'customer-name'
    })
  })

  test('Should return serverError if addCustomer throws', async () => {
    const { sut, addCustomerStub } = makeSut()
    jest.spyOn(addCustomerStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.handle(expectedHttpRequest)
    expect(response.statusCode).toBe(500)
  })
})
