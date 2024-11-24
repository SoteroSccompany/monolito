import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { GenerateInvoiceFacadeInputDto, FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto } from "./invoice.facade.dto";
import InvoiceFacadeInterface from "./invoice.facade.interface";



export default class InvoiceFacade implements InvoiceFacadeInterface {

    constructor(
        private _generateInvoice: UseCaseInterface,
        private _findInvoice: UseCaseInterface
    ) { }


    async generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<void> {
        try {
            await this._generateInvoice.execute(input);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }


    async findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        try {
            const invoice = await this._findInvoice.execute(input);
            return {
                invoice: {
                    id: invoice.id,
                    name: invoice.name,
                    document: invoice.document,
                    street: invoice.street,
                    number: invoice.number,
                    complement: invoice.complement,
                    city: invoice.city,
                    state: invoice.state,
                    zipCode: invoice.zipCode,
                    items: invoice.items,
                    total: invoice.total
                }
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}