import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ActivateProductUseCase from "./activate-product.usecase";


const product = new Product({
    id: new Id('1'),
    name: 'product',
    description: 'description',
    salesPrice: null
})

const product2 = new Product({
    id: new Id('2'),
    name: 'product2',
    description: 'description2',
    salesPrice: 200
})

const MockProductRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
        update: jest.fn()
    }
}
const productAdm = {
    id: "1",
    name: "Product 1",
    description: "Description 1",
    purchasePrice: 100,
    stock: 100
}

const MockFacadeProductAdm = () => {
    return {
        addProduct: jest.fn(),
        checkStock: jest.fn(),
        findProduct: jest.fn().mockReturnValue(Promise.resolve(productAdm))
    }
}
describe("activate product usecase unit test", () => {

    it("should activate a product", async () => {
        const repository = MockProductRepository();
        const facadeProductAdm = MockFacadeProductAdm();
        const usecase = new ActivateProductUseCase({ facadeProductAdm, repository });
        const input = {
            id: '1'
        }
        const response = await usecase.execute(input);
        expect(response.salesPrice).toBe(productAdm.purchasePrice);
        expect(repository.update).toHaveBeenCalled();
        expect(facadeProductAdm.findProduct).toHaveBeenCalled();


    });


});