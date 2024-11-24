import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceEntityFactory from "../../domain/factory/entity.factory";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";


export default class GenerateInvoiceUsecase implements UseCaseInterface {

    constructor(
        private _repositoryInvoice: InvoiceGateway,
        private _clientFacade: ClientAdmFacadeInterface
    ) { }


    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        try {
            await this.validateClient(input.clientId);
            const invoice = InvoiceEntityFactory.create(input);
            await this._repositoryInvoice.add(invoice);
            return {
                id: invoice.id.id,
                clientId: invoice.clientId,
                items: invoice.items.map(item => {
                    return {
                        id: item.id.id,
                        name: item.name,
                        price: item.price
                    }
                }),
                total: invoice.items.reduce((acc, item) => acc + item.price, 0)
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    private async validateClient(clientId: string): Promise<void> {
        const client = await this._clientFacade.find({ clientId });
        if (!client) {
            throw new Error("Client not found");
        }
    }

}