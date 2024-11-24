import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceEntityFactory from "../../domain/factory/entity.factory";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";


export default class GenerateInvoiceUsecase implements UseCaseInterface {

    constructor(
        private _repositoryInvoice: InvoiceGateway
    ) { }


    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        try {
            const invoice = InvoiceEntityFactory.create(input);
            await this._repositoryInvoice.add(invoice);
            return {
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                street: invoice.address.street,
                number: invoice.address.number,
                complement: invoice.address.complement,
                city: invoice.address.city,
                state: invoice.address.state,
                zipCode: invoice.address.zipCode,
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

}