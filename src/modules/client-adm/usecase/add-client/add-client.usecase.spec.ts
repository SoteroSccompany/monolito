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
            addres: "1234 Main St"
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