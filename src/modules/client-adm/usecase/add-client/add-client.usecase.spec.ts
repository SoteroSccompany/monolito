import Address from "../../../@shared/value-object/address";
import AddClientUsecase from "./add-client.usecase";




const MockRepository = () => {
    return {
        find: jest.fn(),
        add: jest.fn()
    }
}

describe('AddClient usecase unit test', () => {

    it('Should add a client', async () => {
        const client = {
            name: "John Doe",
            email: "johndue@email.com",
            document: "123123123",
            address: new Address("street", 123, "complement", "city", "state", "12345678")
        }
        const productRepository = MockRepository();
        const usecase = new AddClientUsecase(productRepository);
        const result = await usecase.execute(client);
        expect(productRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();


    });

});