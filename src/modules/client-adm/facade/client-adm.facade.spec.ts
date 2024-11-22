import { Sequelize } from "sequelize-typescript";
import ClientAdmFactoryFacade from "../factory/facade.factory";
import ClientModel from "../repository/client.model";



describe("Cliente adm facade unit test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ClientModel]);
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
            addres: "Client Addres"
        }
        await facade.add(input);
        const clientDb = await ClientModel.findOne({ where: { id: input.id } });
        expect(clientDb).toBeDefined();
        expect(clientDb?.id).toBeDefined();
        expect(clientDb?.name).toBe(input.name);
        expect(clientDb?.email).toBe(input.email);
        expect(clientDb?.addres).toBe(input.addres);
        expect(clientDb?.createdAt).toBeDefined();
        expect(clientDb?.updatedAt).toBeDefined();
    });

    it("should find a client", async () => {
        ClientModel.create({
            id: "1",
            name: "Client 1",
            email: "client@test",
            addres: "Client Addres",
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
        expect(client.addres).toBe("Client Addres");

    });

});