import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";



export default class FindInvoiceUsecase implements UseCaseInterface {

    constructor(private _repositoryInvoice: InvoiceGateway) { }

    async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDto> {
        try {
            const invoice = await this._repositoryInvoice.find(input.id);
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
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt,
                total: invoice.total
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}