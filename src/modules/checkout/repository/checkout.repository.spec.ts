import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/value-object/address";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutRepository from "./checkout.repository";
import CheckOutModel from "./checkout.model";



describe("Checkout repositoty unit test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([CheckOutModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create an order", async () => {
        const client = new Client({
            id: new Id("1c"),
            name: "Client 0",
            email: "client@user.com",
            address: new Address("Street 1", 123, "Complement", "City", "State", "30770400")
        })
        const product1 = new Product({
            id: new Id("1p"),
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100
        })
        const product2 = new Product({
            id: new Id("2p"),
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 200
        })
        const products = [product1, product2];
        const order = new Order({
            client: client,
            products: products
        });
        const repository = new CheckoutRepository();
        await expect(repository.addOrder(order)).resolves.not.toThrow();
    });


});