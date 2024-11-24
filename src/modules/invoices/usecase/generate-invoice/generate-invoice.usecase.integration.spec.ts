
import { Sequelize } from "sequelize-typescript";
import GenerateInvoiceUsecase from "./generate-invoice.usecase";
import InvoiceItemModel from "../../repository/invoice-item.model";
import InvoiceModel from "../../repository/invoice.model";
import InvoiceRepository from "../../repository/invoice.repository";



describe("Generate invoice usecase integration test", () => {

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
        const usecase = new GenerateInvoiceUsecase(repository);
        const input = {
            name: "Name",
            document: "Document",
            street: "Street",
            number: 123,
            complement: "Complement",
            city: "City",
            state: "State",
            zipCode: "12345678",
            items: [
                {
                    name: "Item 1",
                    price: 100
                }
            ]
        }
        const result = await usecase.execute(input);
        expect(result.id).toBeDefined();
        expect(result.name).toBe("Name");
        expect(result.document).toBe("Document");
        expect(result.street).toBe("Street");
        expect(result.number).toBe(123);
        expect(result.complement).toBe("Complement");
        expect(result.city).toBe("City");
        expect(result.state).toBe("State");
        expect(result.zipCode).toBe("12345678");
        expect(result.items.length).toBe(1);
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(100);
        expect(result.total).toBe(100);
        const checkDb = await InvoiceModel.findOne({
            where: { id: result.id },
            include: [{ model: InvoiceItemModel, as: 'items' }]
        });
        expect(checkDb).toBeDefined();
        expect(checkDb.name).toBe("Name");
        expect(checkDb.document).toBe("Document");
        expect(checkDb.street).toBe("Street");
        expect(checkDb.number).toBe(123);
        expect(checkDb.complement).toBe("Complement");
        expect(checkDb.city).toBe("City");
        expect(checkDb.state).toBe("State");
        expect(checkDb.zipCode).toBe("12345678");
        expect(checkDb.items).toBeDefined();
        expect(checkDb.items.length).toBe(1);
        expect(checkDb.items[0].id).toBeDefined();
        expect(checkDb.items[0].name).toBe("Item 1");
        expect(checkDb.items[0].price).toBe(100);
        expect(checkDb.createdAt).toBeDefined();
        expect(checkDb.updatedAt).toBeDefined();
        expect(checkDb.items[0].createdAt).toBeDefined();
        expect(checkDb.items[0].updatedAt).toBeDefined();

    });

});