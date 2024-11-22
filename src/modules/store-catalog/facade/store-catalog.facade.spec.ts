import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";




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

    it("should find a product", async () => {
        const facade = StoreCatalogFacadeFactory.create();
        await ProductModel.create({
            id: '1',
            name: 'product',
            description: 'product description',
            salesPrice: 10
        })
        const result = await facade.find({ id: '1' });
        expect(result.id).toBe('1');
        expect(result.name).toBe('product');
        expect(result.description).toBe('product description');
        expect(result.salesPrice).toBe(10);
    });

    it("should find all product", async () => {
        const facade = StoreCatalogFacadeFactory.create();
        await ProductModel.create({
            id: '1',
            name: 'product',
            description: 'product description',
            salesPrice: 10
        })
        await ProductModel.create({
            id: '2',
            name: 'product2',
            description: 'product description2',
            salesPrice: 20
        })
        const result = await facade.findAll();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe('1');
        expect(result.products[0].name).toBe('product');
        expect(result.products[0].description).toBe('product description');
        expect(result.products[0].salesPrice).toBe(10);
        expect(result.products[1].id).toBe('2');
        expect(result.products[1].name).toBe('product2');
        expect(result.products[1].description).toBe('product description2');
        expect(result.products[1].salesPrice).toBe(20);

    });





})