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

describe("End to end test client", () => {

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
            .post("/clients")
            .send({
                email: "email",
                document: "document",
                address: {
                    street: "street",
                    number: "number",
                    complement: "complement",
                    city: "city",
                    state: "state",
                    zipcode: '30770400'
                }
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Name is required');
    });

    it("should error when email is not provided", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "name",
                document: "document",
                address: {
                    street: "street",
                    number: "number",
                    complement: "complement",
                    city: "city",
                    state: "state",
                    zipcode: '30770400'
                }
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Email is required');
    });

    it("should error when document is not provided", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "name",
                email: "email",
                address: {
                    street: "street",
                    number: "number",
                    complement: "complement",
                    city: "city",
                    state: "state",
                    zipcode: '30770400'
                }
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Document is required');
    });

    it("should error when street is not provided", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "name",
                email: "email",
                document: "document",
                address: {
                    number: "number",
                    complement: "complement",
                    city: "city",
                    state: "state",
                    zipcode: '30770400'
                }
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Street is required');
    });

    it("should error when number is not provided", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "name",
                email: "email",
                document: "document",
                address: {
                    street: "street",
                    complement: "complement",
                    city: "city",
                    state: "state",
                    zipcode: '30770400'
                }
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Number is required');
    });

    it("should error when complement is not provided", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "name",
                email: "email",
                document: "document",
                address: {
                    street: "street",
                    number: "number",
                    city: "city",
                    state: "state",
                    zipcode: '30770400'
                }
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Complement is required');
    });

    it("should error when city is not provided", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "name",
                email: "email",
                document: "document",
                address: {
                    street: "street",
                    number: "number",
                    complement: "complement",
                    state: "state",
                    zipcode: '30770400'
                }
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('City is required');
    });

    it("should error when state is not provided", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "name",
                email: "email",
                document: "document",
                address: {
                    street: "street",
                    number: "number",
                    complement: "complement",
                    city: "city",
                    zipcode: '30770400'
                }
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('State is required');
    });

    it("should error when zipcode is not provided", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "name",
                email: "email",
                document: "document",
                address: {
                    street: "street",
                    number: "number",
                    complement: "complement",
                    city: "city",
                    state: "state"
                }
            });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Zipcode is required');
    });



    it("should add a client", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                name: "name",
                email: "email",
                document: "document",
                address: {
                    street: "street",
                    number: "number",
                    complement: "complement",
                    city: "city",
                    state: "state",
                    zipcode: '30770400'
                }
            });
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({
            id: expect.any(String),
            name: "name",
            email: "email",
            document: "document",
            address: {
                _street: 'street',
                _number: 'number',
                _complement: 'complement',
                _city: 'city',
                _state: 'state',
                _zipCode: '30770400'
            },
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
        });

    });




});