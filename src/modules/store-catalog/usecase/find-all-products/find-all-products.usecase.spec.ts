import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUsecase from "./find-all.products.usecase";


const product = new Product({
    id: new Id('1'),
    name: 'product',
    description: 'description',
    salesPrice: 100
})

const product2 = new Product({
    id: new Id('2'),
    name: 'product2',
    description: 'description2',
    salesPrice: 200
})

const MockProductRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
        update: jest.fn()
    }
}

describe("find all products usecase unit test", () => {

    it("should find all products", async () => {

        const productRepository = MockProductRepository();
        const usecase = new FindAllProductsUsecase(productRepository);

        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe('1');
        expect(result.products[0].name).toBe('product');
        expect(result.products[0].description).toBe('description');
        expect(result.products[0].salesPrice).toBe(100);
        expect(result.products[1].id).toBe('2');
        expect(result.products[1].name).toBe('product2');
        expect(result.products[1].description).toBe('description2');
        expect(result.products[1].salesPrice).toBe(200);



    });

});