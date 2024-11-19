
import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
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

    it("should create a product", async () => {

        const productProps = {
            id: new Id('1'),
            name: 'product',
            description: 'product description',
            purchasePrice: 10,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const product = new Product(productProps)

        const productRepository = new ProductRepository();
        await productRepository.add(product)

        const productDb = await ProductModel.findOne({ where: { id: productProps.id.id } });


        expect(productProps.id.id).toEqual(productDb.id);
        expect(productProps.name).toEqual(productDb.name);
        expect(productProps.description).toEqual(productDb.description);
        expect(productProps.purchasePrice).toEqual(productDb.purchasePrice);
        expect(productProps.stock).toEqual(productDb.stock);

    });




});