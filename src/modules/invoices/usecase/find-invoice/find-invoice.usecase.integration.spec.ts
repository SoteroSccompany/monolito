
import { Sequelize } from "sequelize-typescript";
import InvoiceItemModel from "../../repository/invoice-item.model";
import InvoiceModel from "../../repository/invoice.model";
import InvoiceRepository from "../../repository/invoice.repository";
import Invoice from "../../domain/entity/invoice";
import Address from "../../../@shared/value-object/address";
import InvoiceItem from "../../domain/entity/invoice-item";
import Id from "../../../@shared/domain/value-object/id.value-object";
import FindInvoiceUsecase from "./find-invoice.usecase";



describe("Find invoice usecase integration test", () => {

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

        const invoice = new Invoice("Name", "Document", new Address("Street", 123, "Complement", "City", "State", "12345678"), [
            new InvoiceItem("Item 1", 100)
        ], new Id('1'), new Date(), new Date());
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            total: invoice.total,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            items: invoice.items.map(item => {
                return {
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                }
            })
        },
            {
                include: [InvoiceItemModel]
            }
        );
        const repository = new InvoiceRepository();
        const usecase = new FindInvoiceUsecase(repository);
        const input = { id: "1" };
        const result = await usecase.execute(input);
        expect(result).toBeDefined();
        expect(result.id).toBe("1");
        expect(result.name).toBe("Name");
        expect(result.document).toBe("Document");
        expect(result.street).toBe("Street");
        expect(result.number).toBe(123);
        expect(result.complement).toBe("Complement");
        expect(result.city).toBe("City");
        expect(result.state).toBe("State");
        expect(result.zipCode).toBe("12345678");
        expect(result.items.length).toBe(1);
        expect(result.items[0].id).toBeDefined();
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(100);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
        expect(result.total).toBe(100);

    });

});