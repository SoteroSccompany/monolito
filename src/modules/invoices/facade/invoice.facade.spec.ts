import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceModel from "../repository/invoice.model";
import ClientModel from "../../client-adm/repository/client.model";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";
import FactoryFacade from "../factory/facade.factory";
import ClientAdmFactoryFacade from "../../client-adm/factory/facade.factory";


describe("Invoice facade test", () => {



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

    it("should generate an invoice", async () => {
        const repository = new InvoiceRepository();
        const facadeClientAdm = ClientAdmFactoryFacade.create();
        const generateUsecase = new GenerateInvoiceUsecase(repository, facadeClientAdm);
        const facade = new InvoiceFacade(generateUsecase, null)
        const client = {
            id: 'c1',
            name: 'Lucian',
            email: 'lucian@123.com',
            document: "1234-5678",
            street: "Rua 123",
            number: 99,
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipcode: "88888888",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await ClientModel.create(client)
        const invoice = {
            clientId: "c1",
            items: [
                {
                    name: "Item 1",
                    price: 100
                },
                {
                    name: "Item 2",
                    price: 200
                }
            ],
            total: 300,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await facade.generateInvoice(invoice);
        const invoiceDb = await InvoiceModel.findOne({
            where: { clientId: invoice.clientId },
            include: [InvoiceItemModel]
        });
        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.clientId).toBe(invoice.clientId);
        expect(invoiceDb.items).toBeDefined();
        expect(invoiceDb.items.length).toBe(2);
        expect(invoiceDb.items[0].name).toBe("Item 1");
        expect(invoiceDb.items[0].price).toBe(100);
        expect(invoiceDb.items[1].name).toBe("Item 2");
        expect(invoiceDb.items[1].price).toBe(200);

    });


    it("should find an invoice", async () => {
        const client = {
            id: 'c1',
            name: 'Lucian',
            email: 'lucian@123.com',
            document: "1234-5678",
            street: "Rua 123",
            number: 99,
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipcode: "88888888",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await ClientModel.create(client)
        await InvoiceModel.create({
            id: "1",
            clientId: "c1",
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
        expect(invoice.invoice.clientId).toBe("c1");
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

        const client = {
            id: 'c1',
            name: 'Lucian',
            email: 'lucian@123.com',
            document: "1234-5678",
            street: "Rua 123",
            number: 99,
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipcode: "88888888",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await ClientModel.create(client)
        const invoice = {
            clientId: "c1",
            items: [
                {
                    name: "Item 1",
                    price: 100
                },
                {
                    name: "Item 2",
                    price: 200
                }
            ],
            total: 300,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await facade.generateInvoice(invoice);
        const invoiceDb = await InvoiceModel.findOne({
            where: { clientId: invoice.clientId },
            include: [InvoiceItemModel]
        });
        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.clientId).toBe(invoice.clientId);
        expect(invoiceDb.items).toBeDefined();
        expect(invoiceDb.items.length).toBe(2);
        expect(invoiceDb.items[0].name).toBe("Item 1");
        expect(invoiceDb.items[0].price).toBe(100);
        expect(invoiceDb.items[1].name).toBe("Item 2");
        expect(invoiceDb.items[1].price).toBe(200);

    });


    it("should find an invoice with factory", async () => {

        const client = {
            id: 'c1',
            name: 'Lucian',
            email: 'lucian@123.com',
            document: "1234-5678",
            street: "Rua 123",
            number: 99,
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipcode: "88888888",
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await ClientModel.create(client)
        await InvoiceModel.create({
            id: "1",
            clientId: "c1",
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
            ],
            total: 300,
            createdAt: new Date(),
            updatedAt: new Date()
        },
            {
                include: [InvoiceItemModel]
            });
        const facade = FactoryFacade.create();
        const invoice = await facade.findInvoice({ id: "1" });
        expect(invoice).toBeDefined();
        expect(invoice.invoice).toBeDefined();
        expect(invoice.invoice.id).toBe("1");
        expect(invoice.invoice.clientId).toBe("c1");
        expect(invoice.invoice.items).toBeDefined();
        expect(invoice.invoice.items.length).toBe(2);
        expect(invoice.invoice.items[0].name).toBe("Item 1");
        expect(invoice.invoice.items[0].price).toBe(100);
        expect(invoice.invoice.items[1].name).toBe("Item 2");
        expect(invoice.invoice.items[1].price).toBe(200);
        expect(invoice.invoice.total).toBe(300);


    });

});