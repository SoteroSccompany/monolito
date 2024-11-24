
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

        const invoice = new Invoice("c1", [
            new InvoiceItem("Item 1", 100)
        ], new Id('1'), new Date(), new Date());
        await InvoiceModel.create({
            id: invoice.id.id,
            clientId: invoice.clientId,
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
        expect(result.clientId).toBe("c1");
        expect(result.items.length).toBe(1);
        expect(result.items[0].id).toBeDefined();
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(100);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
        expect(result.total).toBe(100);

    });

});