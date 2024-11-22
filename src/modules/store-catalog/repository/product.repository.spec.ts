import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";



describe("Product repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should find all products", async () => {

        await ProductModel.create({
            id: '1',
            name: 'product',
            description: 'product description',
            salesPrice: 10
        });

        await ProductModel.create({
            id: '2',
            name: 'product',
            description: 'product description',
            salesPrice: 10
        });

        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();

        expect(products.length).toBe(2);
        expect(products[0].id.id).toBe('1');
        expect(products[1].id.id).toBe('2');
        expect(products[0].name).toBe('product');
        expect(products[1].name).toBe('product');
        expect(products[0].description).toBe('product description');
        expect(products[1].description).toBe('product description');
        expect(products[0].salesPrice).toBe(10);
        expect(products[1].salesPrice).toBe(10);
    });

    it("should find a product", async () => {

        await ProductModel.create({
            id: '3',
            name: 'product',
            description: 'product test',
            salesPrice: 10
        });

        const productRepository = new ProductRepository();
        const product = await productRepository.find('3');

        expect(product.id.id).toBe('3');
        expect(product.name).toBe('product');
        expect(product.description).toBe('product test');
        expect(product.salesPrice).toBe(10);
    });



})