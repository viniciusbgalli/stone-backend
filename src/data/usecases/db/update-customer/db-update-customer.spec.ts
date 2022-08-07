import { CustomerModel, UpdateCustomerRepository, UpdateCustomerModel } from './db-update-customer-protocols'
import { DbUpdateCustomer } from './db-update-customer'

const makeUpdateCustomerRepositoryStub = (): UpdateCustomerRepository => {
  class UpdateCustomerRepositoryStub implements UpdateCustomerRepository {
    async update (data: UpdateCustomerModel): Promise<CustomerModel> {
      const fakeCustomer = {
        id: 'customer-id',
        document: 12345,
        name: 'customer-name'
      }
      return await new Promise((resolve) => resolve(fakeCustomer))
    }
  }
  return new UpdateCustomerRepositoryStub()
}

interface SutTypes{
  sut: DbUpdateCustomer
  updateCustomerRepositoryStub: UpdateCustomerRepository
}

const makeSut = (): SutTypes => {
  const updateCustomerRepositoryStub = makeUpdateCustomerRepositoryStub()
  const sut = new DbUpdateCustomer(updateCustomerRepositoryStub)
  return {
    sut,
    updateCustomerRepositoryStub
  }
}

const fakeCustomer = {
  id: 'customer-id',
  document: 12345,
  name: 'customer-name'
}

describe('Db Update Customer', () => {
  test('Should call updateCustomerRepository with correct values', async () => {
    const { sut, updateCustomerRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateCustomerRepositoryStub, 'update')
    await sut.update(fakeCustomer)
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'customer-id',
      document: 12345,
      name: 'customer-name'
    })
  })

  test('Should return a customer on success', async () => {
    const { sut } = makeSut()
    const customer = await sut.update(fakeCustomer)
    expect(customer).toEqual({
      id: 'customer-id',
      document: 12345,
      name: 'customer-name'
    })
  })

  test('Should throw if updateCustomerRepository throws', async () => {
    const { sut, updateCustomerRepositoryStub } = makeSut()
    jest.spyOn(updateCustomerRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(fakeCustomer)
    await expect(promise).rejects.toThrow()
  })
})
