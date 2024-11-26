import { Sequelize } from "sequelize-typescript"
import InvoiceItemModel from "../../invoices/repository/invoice-item.model"
import InvoiceModel from "../../invoices/repository/invoice.model"
import ClientModel from "./client.model"
import ClientRepository from "./client.repository"
import Client from "../domain/client.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../../@shared/value-object/address"

describe("Client Repository test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([ClientModel, InvoiceModel, InvoiceItemModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {

        const client = new Client({
            id: new Id("1"),
            name: "Lucian",
            email: "lucian@teste.com",
            document: "1234-5678",
            address: new Address(
                "Rua 123",
                99,
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888888"
            )
            // address: "Rua 123",
        })

        const repository = new ClientRepository()
        await repository.add(client)

        const clientDb = await ClientModel.findOne({ where: { id: "1" } })

        expect(clientDb).toBeDefined()
        expect(clientDb.id).toBe(client.id.id)
        expect(clientDb.name).toBe(client.name)
        expect(clientDb.email).toBe(client.email)
        expect(clientDb.document).toBe(client.document)
        expect(clientDb.street).toBe(client.address.street)
        expect(Number(clientDb.number)).toBe(client.address.number)
        expect(clientDb.complement).toBe(client.address.complement)
        expect(clientDb.city).toBe(client.address.city)
        expect(clientDb.state).toBe(client.address.state)
        expect(clientDb.zipcode).toBe(client.address.zipCode)
        expect(clientDb.createdAt).toStrictEqual(client.createdAt)
        expect(clientDb.updatedAt).toStrictEqual(client.updatedAt)
    })

    it("should find a client", async () => {

        const client = {
            id: '1',
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

        const repository = new ClientRepository()
        const result = await repository.find(client.id)

        expect(result.id.id).toEqual(client.id)
        expect(result.name).toEqual(client.name)
        expect(result.email).toEqual(client.email)
        expect(result.address.street).toEqual(client.street)
        expect(result.address.number).toEqual(client.number)
        expect(result.address.complement).toEqual(client.complement)
        expect(result.address.city).toEqual(client.city)
        expect(result.address.state).toEqual(client.state)
        expect(result.address.zipCode).toEqual(client.zipcode)
        expect(result.createdAt).toStrictEqual(client.createdAt)
        expect(result.updatedAt).toStrictEqual(client.updatedAt)
    })
})