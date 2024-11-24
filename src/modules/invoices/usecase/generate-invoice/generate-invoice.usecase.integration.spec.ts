
import { Sequelize } from "sequelize-typescript";
import GenerateInvoiceUsecase from "./generate-invoice.usecase";
import InvoiceItemModel from "../../repository/invoice-item.model";
import InvoiceModel from "../../repository/invoice.model";
import InvoiceRepository from "../../repository/invoice.repository";
import FactoryFacade from "../../factory/facade.factory";
import ClientAdmFactoryFacade from "../../../client-adm/factory/facade.factory";
import ClientModel from "../../../client-adm/repository/client.model";
import Address from "../../../@shared/value-object/address";
import Client from "../../../client-adm/domain/client.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";



describe("Generate invoice usecase integration test", () => {

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
        const address = new Address('street', 123, 'complement', 'city', 'state', '12345678');
        const client = new Client({
            id: new Id('c1'),
            name: 'gabriel',
            email: 'asdasd@asds.com',
            document: '654654',
            address: address
        })
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
        const repository = new InvoiceRepository();
        const clientAdmFacade = ClientAdmFactoryFacade.create();
        const usecase = new GenerateInvoiceUsecase(repository, clientAdmFacade);
        const input = {
            clientId: "c1",
            items: [
                {
                    name: "Item 1",
                    price: 100
                }
            ]
        }
        const result = await usecase.execute(input);
        expect(result.id).toBeDefined();
        expect(result.clientId).toBe("c1");
        expect(result.items.length).toBe(1);
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(100);
        expect(result.total).toBe(100);
        const checkDb = await InvoiceModel.findOne({
            where: { id: result.id },
            include: [{ model: InvoiceItemModel, as: 'items' }]
        });
        expect(checkDb).toBeDefined();
        expect(checkDb.clientId).toBe("c1");
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