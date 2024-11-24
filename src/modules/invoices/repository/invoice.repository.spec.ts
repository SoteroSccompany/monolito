import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";
import ClientModel from "../../client-adm/repository/client.model";
import InvoiceItem from "../domain/entity/invoice-item";
import Invoice from "../domain/entity/invoice";
import InvoiceRepository from "./invoice.repository";
import Client from "../../client-adm/domain/client.entity";
import Address from "../../@shared/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";



describe("Invoice repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            sync: { force: true },
            logging: false
        });
        sequelize.addModels([ClientModel, InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should add an invoice", async () => {
        const address = new Address('street', 123, 'complement', 'city', 'state', '12345678');
        const client = new Client({
            id: new Id('c1'),
            name: 'gabriel',
            email: 'email@email.com',
            document: '654654',
            address: address
        });
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.address.street,
            number: client.address.number,
            complement: client.address.complement,
            city: client.address.city,
            state: client.address.state,
            zipcode: client.address.zipCode,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const invoice = new Invoice(client.id.id, [
            new InvoiceItem("Item 1", 100)
        ], new Id('1'), new Date(), new Date());

        const repository = new InvoiceRepository();

        await repository.add(invoice);

        const invoiceDb = await InvoiceModel.findOne({
            where: { id: invoice.id.id },
            include: [InvoiceItemModel]
        });
        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.clientId).toBe(invoice.clientId);
        expect(invoiceDb.id).toBe(invoice.id.id);


    });

    it("should find an invoice", async () => {
        const address = new Address('street', 123, 'complement', 'city', 'state', '12345678');
        const client = new Client({
            id: new Id('c1'),
            name: 'gabriel',
            email: 'email@email.com',
            document: '654654',
            address: address
        });
        await ClientModel.create({
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.address.street,
            number: client.address.number,
            complement: client.address.complement,
            city: client.address.city,
            state: client.address.state,
            zipcode: client.address.zipCode,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await InvoiceModel.create({
            id: "1",
            clientId: "c1",
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        },
            {
                include: [{ model: InvoiceItemModel, as: 'items' }]
            });

        const repository = new InvoiceRepository();
        const invoice = await repository.find("1");

        expect(invoice).toBeDefined();
        expect(invoice.clientId).toBe("c1");
        expect(invoice.items.length).toBe(1);
        expect(invoice.items[0].name).toBe("Item 1");
        expect(invoice.items[0].price).toBe(100);
        expect(invoice.id.id).toBe("1");
        expect(invoice.id).toBeDefined();
        expect(invoice.createdAt).toBeDefined();
        expect(invoice.updatedAt).toBeDefined();


    });



});
