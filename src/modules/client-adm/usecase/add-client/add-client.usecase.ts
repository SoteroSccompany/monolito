import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClienteUseCaseInputDto, AddClienteUseCaseOutputDto } from "./add-cliente.usecase.dto";


export default class AddClientUsecase implements UseCaseInterface {

    private _clientRepository: ClientGateway;

    constructor(repository: ClientGateway) {
        this._clientRepository = repository;
    }


    async execute(input: AddClienteUseCaseInputDto): Promise<AddClienteUseCaseOutputDto> {
        try {
            const props = {
                id: new Id(input.id) || new Id(),
                name: input.name,
                email: input.email,
                addres: input.addres,
            }
            const client = new Client(props);
            await this._clientRepository.add(client);
            return {
                id: client.id.id,
                name: client.name,
                email: client.email,
                addres: client.addres,
                createdAt: client.createdAt,
                updatedAt: client.updatedAt
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}