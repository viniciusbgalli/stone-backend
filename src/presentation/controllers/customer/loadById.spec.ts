import { LoadCustomer } from '../../../domain/usecases/load-customer-by-id'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { ServerError } from '../../../presentation/errors/server-error'
import { ok } from '../../../presentation/helpers/http-helper'
import { CustomerModel } from '../../../domain/models/customer'
import { LoadCustomerByIdController } from './loadById'

const makeLoadByIdCustomerStub = (): LoadCustomer => {
  class LoadByIdCustomerStub implements LoadCustomer {
    async loadById (id: string): Promise<CustomerModel> {
      const fakeCustomer = {
        id: 'customer-id',
        document: 12345,
        name: 'customer-name'
      }
      return await new Promise((resolve) => resolve(fakeCustomer))
    }
  }
  return new LoadByIdCustomerStub()
}

interface SutTypes{
  sut: LoadCustomerByIdController
  loadByIdCustomerStub: LoadCustomer
}

const makeSut = (): SutTypes => {
  const loadByIdCustomerStub = makeLoadByIdCustomerStub()
  const sut = new LoadCustomerByIdController(loadByIdCustomerStub)
  return {
    sut,
    loadByIdCustomerStub
  }
}

const expectedHttpRequest = {
  params: {
    id: 'uuivd4'
  }
}

describe('Load Customer by Id Controller', () => {
  test('Should call LoadCustomerById with correct value', async () => {
    const { sut, loadByIdCustomerStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadByIdCustomerStub, 'loadById')
    await sut.handle(expectedHttpRequest)
    expect(loadByIdSpy).toHaveBeenCalledWith('uuivd4')
  })

  test('Should return 404 if no customer found', async () => {
    const { sut, loadByIdCustomerStub } = makeSut()
    jest.spyOn(loadByIdCustomerStub, 'loadById').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const response = await sut.handle(expectedHttpRequest)
    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual(new InvalidParamError('id').message)
  })

  test('Should load a customer on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(expectedHttpRequest)
    expect(response).toEqual(ok({
      id: 'customer-id',
      document: 12345,
      name: 'customer-name'
    }))
  })

  test('Should return serverError if addCustomer throws', async () => {
    const { sut, loadByIdCustomerStub } = makeSut()
    jest.spyOn(loadByIdCustomerStub, 'loadById').mockImplementationOnce(() => {
      throw new Error()
    })

    const response = await sut.handle(expectedHttpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new ServerError())
  })
})