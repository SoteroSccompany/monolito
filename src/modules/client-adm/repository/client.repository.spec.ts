import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientModel from "./client.model";
import Client from "../domain/client.entity";
import ClientRepository from "./client.repository";




describe('ClientRepository', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });
        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create a client', async () => {
        // Arrange
        const client = new Client({
            id: new Id('123'),
            name: 'Client Name',
            email: 'client@test',
            addres: 'Client Addres'
        });

        const clientRepository = new ClientRepository();
        await clientRepository.add(client);
        const clientDb = await ClientModel.findOne({ where: { id: client.id.id } });
        expect(client.id.id).toEqual(clientDb.id);
        expect(client.name).toEqual(clientDb.name);
        expect(client.email).toEqual(clientDb.email);
        expect(client.addres).toEqual(clientDb.addres);
        expect(client.createdAt).toBeDefined();
        expect(client.updatedAt).toBeDefined();
        // Act
        // Assert
    });

    it('should find a client', async () => {
        const clientRepository = new ClientRepository();

        ClientModel.create({
            id: '123',
            name: 'Client Name',
            email: 'client@test',
            addres: 'Client Addres',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const client = await clientRepository.find('123');
        expect(client.id.id).toBe('123');
        expect(client.name).toBe('Client Name');
        expect(client.email).toBe('client@test');
        expect(client.addres).toBe('Client Addres');

    });
});