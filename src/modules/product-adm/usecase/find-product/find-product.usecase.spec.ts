import Id from "../../../@shared/domain/value-object/id.value-object";
import FindProductUseCase from "./find-product.usecase";


const MockRepository = () => {
    return {
        find: jest.fn(),
        add: jest.fn(),
    }
}

describe("Unit test find product use case", () => {


    it("should find a product", async () => {

        const productMock = {
            id: new Id('1'),
            name: 'product 1',
            description: 'product description',
            purchasePrice: 10,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const input = {
            id: productMock.id.id
        }
        const repository = MockRepository();
        repository.find.mockResolvedValue(Promise.resolve(productMock));
        const usecase = new FindProductUseCase(repository)

        const output = await usecase.execute(input);
        expect(repository.find).toHaveBeenCalled();
        expect(output.id).toBe(productMock.id.id);
        expect(output.name).toBe(productMock.name);
        expect(output.description).toBe(productMock.description);
        expect(output.purchasePrice).toBe(productMock.purchasePrice);
        expect(output.stock).toBe(productMock.stock);
        expect(output.createdAt).toBe(productMock.createdAt);
        expect(output.updatedAt).toBe(productMock.updatedAt);


    });


});