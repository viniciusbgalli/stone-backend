
import { CustomerModel, LoadCustomerByIdRepository } from './db-load-by-id-customer-protocols'
import { DbLoadByIdCustomer } from './db-load-by-id-customer'

const makeLoadCustomerByIdRepositoryStub = (): LoadCustomerByIdRepository => {
  class LoadCustomerByIdRepositoryStub implements LoadCustomerByIdRepository {
    async loadById (id: string): Promise<CustomerModel | null> {
      const fakeCustomer = {
        id: 'customer-id',
        document: 12345,
        name: 'customer-name'
      }
      return await new Promise((resolve) => resolve(fakeCustomer))
    }
  }
  return new LoadCustomerByIdRepositoryStub()
}

interface SutTypes{
  sut: DbLoadByIdCustomer
  loadCustomerByIdRepositoryStub: LoadCustomerByIdRepository
}

const makeSut = (): SutTypes => {
  const loadCustomerByIdRepositoryStub = makeLoadCustomerByIdRepositoryStub()
  const sut = new DbLoadByIdCustomer(loadCustomerByIdRepositoryStub)
  return {
    sut,
    loadCustomerByIdRepositoryStub
  }
}

describe('Db Add Customer', () => {
  test('Should call LoadCustomerByIdRepository with correct values', async () => {
    const { sut, loadCustomerByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadCustomerByIdRepositoryStub, 'loadById')
    await sut.loadById('fake-id')
    expect(loadByIdSpy).toHaveBeenCalledWith('fake-id')
  })

  test('Should return a customer on success', async () => {
    const { sut } = makeSut()
    const customer = await sut.loadById('fake-id')
    expect(customer).toEqual({
      id: 'customer-id',
      document: 12345,
      name: 'customer-name'
    })
  })

  test('Should throw if addCustomerRepository throws', async () => {
    const { sut, loadCustomerByIdRepositoryStub } = makeSut()
    jest.spyOn(loadCustomerByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadById('fake-id')
    await expect(promise).rejects.toThrow()
  })
})
