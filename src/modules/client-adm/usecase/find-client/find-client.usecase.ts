import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Address from "../../../@shared/value-object/address";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientUsecaseInputDto, FindClientUsecaseOutputDto } from "./find-client.usecase.dto";



export default class FindClientUsecase implements UseCaseInterface {
    private _clientRepository: ClientGateway;

    constructor(repository: ClientGateway) {
        this._clientRepository = repository;
    }

    async execute(input: FindClientUsecaseInputDto): Promise<FindClientUsecaseOutputDto> {
        try {
            const client = await this._clientRepository.find(input.id);
            return {
                id: client.id.id,
                name: client.name,
                email: client.email,
                address: new Address(
                    client.address.street,
                    client.address.number,
                    client.address.complement,
                    client.address.city,
                    client.address.state,
                    client.address.zipCode,
                ),
                createdAt: client.createdAt,
                updatedAt: client.updatedAt
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}