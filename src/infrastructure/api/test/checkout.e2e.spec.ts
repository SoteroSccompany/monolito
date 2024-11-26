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

describe("End to end test checkout", () => {

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

    //REALIZAR TESTES PARA QUANDO FOR DECLINE, PRODUTO SEM PRECO DE VENDA, ETC
    it("should place an order", async () => {
        //criar um client, criar um produto, criar a ordem
        const client = await request(app)
            .post("/clients")
            .send({
                name: "name",
                email: "email",
                document: "document",
                address: {
                    street: "street",
                    number: 498,
                    complement: "complement",
                    city: "city",
                    state: "state",
                    zipcode: '30770400'
                }
            });
        expect(client.status).toBe(200);

        const product = await request(app)
            .post("/products")
            .send({
                name: "name",
                description: "description",
                purchasePrice: 150, // menor que 100 fica pendente
                stock: 10
            });
        expect(product.status).toBe(200);

        const activate = await request(app)
            .get(`/products/${product.body.id}`);
        expect(activate.status).toBe(200);

        const order = await request(app)
            .post("/checkout")
            .send({
                clientId: client.body.id,
                products: [{ productId: product.body.id }]
            });
        console.log(order.body);
        expect(order.status).toBe(200);
        expect(order.body).toHaveProperty("id");
        expect(order.body).toHaveProperty("status");
        expect(order.body).toHaveProperty("total");
        expect(order.body).toHaveProperty("products");
        expect(order.body.products[0]).toHaveProperty("productId");



    });




});