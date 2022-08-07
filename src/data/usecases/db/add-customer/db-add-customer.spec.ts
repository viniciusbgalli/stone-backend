import { CreateCustomerModel, CustomerModel, AddCustomerRepository } from './db-add-customer-protocols'
import { DbAddCustomer } from './db-add-customer'

const makeAddCustomerRepositoryStub = (): AddCustomerRepository => {
  class AddCustomerRepositoryStub implements AddCustomerRepository {
    async add (data: CreateCustomerModel): Promise<CustomerModel> {
      const fakeCustomer = {
        id: 'customer-id',
        document: 12345,
        name: 'customer-name'
      }
      return await new Promise((resolve) => resolve(fakeCustomer))
    }
  }
  return new AddCustomerRepositoryStub()
}

interface SutTypes{
  sut: DbAddCustomer
  addCustomerRepositoryStub: AddCustomerRepository
}

const makeSut = (): SutTypes => {
  const addCustomerRepositoryStub = makeAddCustomerRepositoryStub()
  const sut = new DbAddCustomer(addCustomerRepositoryStub)
  return {
    sut,
    addCustomerRepositoryStub
  }
}

const fakeCustomer = {
  document: 12345,
  name: 'customer-name'
}

describe('Db Add Customer', () => {
  test('Should call addCustomerRepository with correct values', async () => {
    const { sut, addCustomerRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addCustomerRepositoryStub, 'add')
    await sut.add(fakeCustomer)
    expect(addSpy).toHaveBeenCalledWith({
      document: 12345,
      name: 'customer-name'
    })
  })

  test('Should return a customer on success', async () => {
    const { sut } = makeSut()
    const customer = await sut.add(fakeCustomer)
    expect(customer).toEqual({
      id: 'customer-id',
      document: 12345,
      name: 'customer-name'
    })
  })

  test('Should throw if addCustomerRepository throws', async () => {
    const { sut, addCustomerRepositoryStub } = makeSut()
    jest.spyOn(addCustomerRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(fakeCustomer)
    await expect(promise).rejects.toThrow()
  })
})
