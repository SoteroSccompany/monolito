import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import FactoryFacade from "../factory/facade.factory";


describe("Invoice facade test", () => {



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

    it("should generate an invoice", async () => {
        const repository = new InvoiceRepository();
        const generateUsecase = new GenerateInvoiceUsecase(repository)
        const facade = new InvoiceFacade(generateUsecase, null)
        const invoice = {
            name: "John Doe",
            document: "123456789",
            street: "Main Street",
            number: 123,
            complement: "Near the park",
            city: "Springfield",
            state: "SP",
            zipCode: "12345678",
            items: [
                {
                    name: "Item 1",
                    price: 100
                },
                {
                    name: "Item 2",
                    price: 200
                }
            ]
        }
        await facade.generateInvoice(invoice);
        const invoiceDb = await InvoiceModel.findOne({
            where: { document: invoice.document },
            include: [InvoiceItemModel]
        });
        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.name).toBe(invoice.name);
        expect(invoiceDb.document).toBe(invoice.document);
        expect(invoiceDb.street).toBe(invoice.street);
        expect(invoiceDb.number).toBe(invoice.number);
        expect(invoiceDb.complement).toBe(invoice.complement);
        expect(invoiceDb.city).toBe(invoice.city);
        expect(invoiceDb.state).toBe(invoice.state);
        expect(invoiceDb.zipCode).toBe(invoice.zipCode);
        expect(invoiceDb.items).toBeDefined();
        expect(invoiceDb.items.length).toBe(2);
        expect(invoiceDb.items[0].name).toBe("Item 1");
        expect(invoiceDb.items[0].price).toBe(100);
        expect(invoiceDb.items[1].name).toBe("Item 2");
        expect(invoiceDb.items[1].price).toBe(200);

    });


    it("should find an invoice", async () => {
        await InvoiceModel.create({
            id: "1",
            name: "John Doe",
            document: "123456789",
            street: "Main Street",
            number: 123,
            complement: "Near the park",
            city: "Springfield",
            state: "SP",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 200
                }
            ]
        },
            {
                include: [InvoiceItemModel]
            });
        const repository = new InvoiceRepository();
        const findUsecase = new FindInvoiceUsecase(repository)
        const facade = new InvoiceFacade(null, findUsecase)
        const invoice = await facade.findInvoice({ id: "1" });
        expect(invoice).toBeDefined();
        expect(invoice.invoice).toBeDefined();
        expect(invoice.invoice.id).toBe("1");
        expect(invoice.invoice.name).toBe("John Doe");
        expect(invoice.invoice.document).toBe("123456789");
        expect(invoice.invoice.street).toBe("Main Street");
        expect(invoice.invoice.number).toBe(123);
        expect(invoice.invoice.complement).toBe("Near the park");
        expect(invoice.invoice.city).toBe("Springfield");
        expect(invoice.invoice.state).toBe("SP");
        expect(invoice.invoice.zipCode).toBe("12345678");
        expect(invoice.invoice.items).toBeDefined();
        expect(invoice.invoice.items.length).toBe(2);
        expect(invoice.invoice.items[0].name).toBe("Item 1");
        expect(invoice.invoice.items[0].price).toBe(100);
        expect(invoice.invoice.items[1].name).toBe("Item 2");
        expect(invoice.invoice.items[1].price).toBe(200);
        expect(invoice.invoice.total).toBe(300);


    });

    it("should generate an invoice with factory", async () => {
        const facade = FactoryFacade.create();
        const invoice = {
            name: "John Doe",
            document: "123456789",
            street: "Main Street",
            number: 123,
            complement: "Near the park",
            city: "Springfield",
            state: "SP",
            zipCode: "12345678",
            items: [
                {
                    name: "Item 1",
                    price: 100
                },
                {
                    name: "Item 2",
                    price: 200
                }
            ]
        }
        await facade.generateInvoice(invoice);
        const invoiceDb = await InvoiceModel.findOne({
            where: { document: invoice.document },
            include: [InvoiceItemModel]
        });
        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.name).toBe(invoice.name);
        expect(invoiceDb.document).toBe(invoice.document);
        expect(invoiceDb.street).toBe(invoice.street);
        expect(invoiceDb.number).toBe(invoice.number);
        expect(invoiceDb.complement).toBe(invoice.complement);
        expect(invoiceDb.city).toBe(invoice.city);
        expect(invoiceDb.state).toBe(invoice.state);
        expect(invoiceDb.zipCode).toBe(invoice.zipCode);
        expect(invoiceDb.items).toBeDefined();
        expect(invoiceDb.items.length).toBe(2);
        expect(invoiceDb.items[0].name).toBe("Item 1");
        expect(invoiceDb.items[0].price).toBe(100);
        expect(invoiceDb.items[1].name).toBe("Item 2");
        expect(invoiceDb.items[1].price).toBe(200);

    });


    it("should find an invoice with factory", async () => {
        await InvoiceModel.create({
            id: "1",
            name: "John Doe",
            document: "123456789",
            street: "Main Street",
            number: 123,
            complement: "Near the park",
            city: "Springfield",
            state: "SP",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 200
                }
            ]
        },
            {
                include: [InvoiceItemModel]
            });
        const facade = FactoryFacade.create();
        const invoice = await facade.findInvoice({ id: "1" });
        expect(invoice).toBeDefined();
        expect(invoice.invoice).toBeDefined();
        expect(invoice.invoice.id).toBe("1");
        expect(invoice.invoice.name).toBe("John Doe");
        expect(invoice.invoice.document).toBe("123456789");
        expect(invoice.invoice.street).toBe("Main Street");
        expect(invoice.invoice.number).toBe(123);
        expect(invoice.invoice.complement).toBe("Near the park");
        expect(invoice.invoice.city).toBe("Springfield");
        expect(invoice.invoice.state).toBe("SP");
        expect(invoice.invoice.zipCode).toBe("12345678");
        expect(invoice.invoice.items).toBeDefined();
        expect(invoice.invoice.items.length).toBe(2);
        expect(invoice.invoice.items[0].name).toBe("Item 1");
        expect(invoice.invoice.items[0].price).toBe(100);
        expect(invoice.invoice.items[1].name).toBe("Item 2");
        expect(invoice.invoice.items[1].price).toBe(200);
        expect(invoice.invoice.total).toBe(300);


    });

});