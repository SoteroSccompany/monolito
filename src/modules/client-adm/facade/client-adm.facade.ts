import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.dto";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";

export interface UsecaseProps {
    findUseCase: UseCaseInterface;
    addUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _addUseCase: UseCaseInterface;
    private _findUseCase: UseCaseInterface;

    constructor(usecaseProps: UsecaseProps) {
        this._addUseCase = usecaseProps.addUseCase;
        this._findUseCase = usecaseProps.findUseCase
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        return await this._addUseCase.execute(input);
    }

    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        const client = await this._findUseCase.execute({ id: input.clientId });
        return {
            clientId: client.id,
            name: client.name,
            email: client.email,
            addres: client.addres,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }


}