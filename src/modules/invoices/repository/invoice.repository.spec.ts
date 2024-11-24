import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";
import InvoiceItem from "../domain/entity/invoice-item";
import Invoice from "../domain/entity/invoice";
import InvoiceRepository from "./invoice.repository";
import Address from "../../@shared/value-object/address";



describe("Invoice repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            sync: { force: true },
            logging: false
        });
        sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    })

    it("should add an invoice", async () => {
        const address = new Address("Street", 123, "Complement", "City", "State", "12345678");
        const invoiceItem = new InvoiceItem("Item 1", 100);
        const invoice = new Invoice("Name", "Document", address, [invoiceItem]);
        const repository = new InvoiceRepository();

        await repository.add(invoice);

        const invoiceDb = await InvoiceModel.findOne({
            where: { id: invoice.id.id },
            include: [{ model: InvoiceItemModel, as: 'items' }]
        });

        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.name).toBe("Name");
        expect(invoiceDb.document).toBe("Document");
        expect(invoiceDb.street).toBe("Street");
        expect(invoiceDb.number).toBe(123);
        expect(invoiceDb.complement).toBe("Complement");
        expect(invoiceDb.city).toBe("City");
        expect(invoiceDb.state).toBe("State");
        expect(invoiceDb.zipCode).toBe("12345678");
        expect(invoiceDb.items).toBeDefined();
        expect(invoiceDb.items.length).toBe(1);
        expect(invoiceDb.items[0].name).toBe("Item 1");
        expect(invoiceDb.items[0].price).toBe(100);
        expect(invoiceDb.createdAt).toBeDefined();
        expect(invoiceDb.updatedAt).toBeDefined();
    });

    it("should find an invoice", async () => {
        await InvoiceModel.create({
            id: "1",
            name: "Name",
            document: "Document",
            street: "Street",
            number: 123,
            complement: "Complement",
            city: "City",
            state: "State",
            zipCode: "12345678",
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
        expect(invoice.name).toBe("Name");
        expect(invoice.document).toBe("Document");
        expect(invoice.address).toBeDefined();
        expect(invoice.address.street).toBe("Street");
        expect(invoice.address.number).toBe(123);
        expect(invoice.address.complement).toBe("Complement");
        expect(invoice.address.city).toBe("City");
        expect(invoice.address.state).toBe("State");
        expect(invoice.address.zipCode).toBe("12345678");
        expect(invoice.items.length).toBe(1);
        expect(invoice.items[0].name).toBe("Item 1");
        expect(invoice.items[0].price).toBe(100);
        expect(invoice.id.id).toBe("1");
        expect(invoice.id).toBeDefined();
        expect(invoice.createdAt).toBeDefined();
        expect(invoice.updatedAt).toBeDefined();


    });



});
