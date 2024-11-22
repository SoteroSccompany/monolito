import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import ClientModel from "./client.model";


export default class ClientRepository implements ClientGateway {


    async add(client: Client): Promise<void> {
        try {
            await ClientModel.create({
                id: client.id.id,
                name: client.name,
                email: client.email,
                addres: client.addres,
                createdAt: client.createdAt || new Date(),
                updatedAt: client.updatedAt || new Date()
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }


    async find(id: string): Promise<Client> {
        try {
            const response = await ClientModel.findOne({ where: { id } });
            if (!response) {
                throw new Error(`Client with id ${id} not found`);
            }
            const client = new Client({
                id: new Id(response.id),
                name: response.name,
                email: response.email,
                addres: response.addres,
                createdAt: response.createdAt,
                updatedAt: response.updatedAt
            })
            return client;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}