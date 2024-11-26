import { Sequelize } from "sequelize-typescript";
import ClientAdmFactoryFacade from "../factory/facade.factory";
import InvoiceItemModel from "../../invoices/repository/invoice-item.model";
import InvoiceModel from "../../invoices/repository/invoice.model";
import ClientModel from "../repository/client.model";
import Address from "../../@shared/value-object/address";



describe("Cliente adm facade unit test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ClientModel, InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        const facade = ClientAdmFactoryFacade.create();
        const input = {
            id: "1",
            name: "Client 1",
            email: "client@test",
            document: "123123123",
            address: new Address("Client Addres", 123, "Complement", "City", "State", "12345678")
        }
        await facade.add(input);
        const clientDb = await ClientModel.findOne({ where: { id: input.id } });
        expect(clientDb).toBeDefined();
        expect(clientDb?.id).toBeDefined();
        expect(clientDb?.name).toBe(input.name);
        expect(clientDb?.email).toBe(input.email);
        expect(clientDb?.street).toBe(input.address.street);
        expect(Number(clientDb?.number)).toBe(input.address.number);
        expect(clientDb?.complement).toBe(input.address.complement);
        expect(clientDb?.city).toBe(input.address.city);
        expect(clientDb?.state).toBe(input.address.state);
        expect(clientDb?.zipcode).toBe(input.address.zipCode);
        expect(clientDb?.createdAt).toBeDefined();
        expect(clientDb?.updatedAt).toBeDefined();
    });

    it("should find a client", async () => {
        ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "client@test",
            document: "123123123",
            street: "Client Addres",
            number: 123,
            complement: "Complement",
            city: "City",
            state: "State",
            zipcode: "12345678",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const facade = ClientAdmFactoryFacade.create();
        const input = { clientId: "1" };
        const client = await facade.find(input);
        expect(client).toBeDefined();
        expect(client.clientId).toBe(input.clientId);
        expect(client.name).toBe("Client 1");
        expect(client.email).toBe("client@test");
        expect(client.address.street).toBe("Client Addres");
        expect(client.address.number).toBe(123);
        expect(client.address.complement).toBe("Complement");
        expect(client.address.city).toBe("City");
        expect(client.address.state).toBe("State");
        expect(client.address.zipCode).toBe("12345678");
        expect(client.createdAt).toBeDefined();
        expect(client.updatedAt).toBeDefined();

    });

});