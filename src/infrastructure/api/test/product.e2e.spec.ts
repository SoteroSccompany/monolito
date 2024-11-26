import { app } from '../express';
import request from 'supertest';
import { Sequelize } from 'sequelize-typescript';
import { Umzug } from 'umzug';
import { migrator } from '../../migrations/config/migrator';
import ClientModel from '../../../modules/client-adm/repository/client.model';
import InvoiceModel from '../../../modules/invoices/repository/invoice.model';
import InvoiceItemModel from '../../../modules/invoices/repository/invoice-item.model';
import TransactionModel from '../../../modules/payment/repository/transaction.model';
import ProductModel from '../../../modules/product-adm/repository/product.model';
import ProductModelCatalog from '../../../modules/store-catalog/repository/product.model';
import CheckOutModel from '../../../modules/checkout/repository/checkout.model';

describe("End to end test product", () => {

    let sequelize: Sequelize;
    let migration: Umzug<any>;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false
        });
        await sequelize.addModels([ClientModel, CheckOutModel, InvoiceModel, InvoiceItemModel, TransactionModel, ProductModel, ProductModelCatalog]);

        // await sequelize.sync({ force: false }); // Use "true" apenas para recriar as tabelas.

        migration = migrator(sequelize);
        await migration.up();

    });

    afterEach(async () => {
        await migration.down();
    });

    it("should error when name is not provided", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                description: "description",
                purchasePrice: 10,
                stock: 10
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Name is required');

    });

    it("should error when name and description is not provided", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                purchasePrice: 10,
                stock: 10
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Name is required, Description is required');
    });

    it("should error when name, description and purchasePrice is not provided", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                stock: 10
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Name is required, Description is required, Purchase Price is required');
    });

    it("should error when name, description, purchasePrice and stock is not provided", async () => {
        const response = await request(app)
            .post("/products")
            .send({});

        expect(response.status).toBe(400);
        expect(response.text).toBe('Name is required, Description is required, Purchase Price is required, Stock is required');
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "product",
                description: "description",
                purchasePrice: 200,
                stock: 10
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('purchasePrice');
        expect(response.body).toHaveProperty('stock');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('product');
        expect(response.body.description).toBe('description');
        expect(response.body.purchasePrice).toBe(200);
        expect(response.body.stock).toBe(10);
        expect(response.body.createdAt).toBeDefined();
        expect(response.body.updatedAt).toBeDefined();
    });

    it("should activate a product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "product",
                description: "description",
                purchasePrice: 200,
                stock: 10
            });

        expect(response.status).toBe(200);

        const responseActivate = await request(app)
            .get(`/products/${response.body.id}`);

        expect(responseActivate.status).toBe(200);

    });

});