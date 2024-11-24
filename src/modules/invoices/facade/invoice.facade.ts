import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { GenerateInvoiceFacadeInputDto, FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeOutPutDto } from "./invoice.facade.dto";
import InvoiceFacadeInterface from "./invoice.facade.interface";



export default class InvoiceFacade implements InvoiceFacadeInterface {

    constructor(
        private _generateInvoice: UseCaseInterface,
        private _findInvoice: UseCaseInterface
    ) { }


    async generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutPutDto> {
        try {
            const invoice = await this._generateInvoice.execute(input);
            return {
                id: invoice.id.id,
                clientId: invoice.clientId,
                items: invoice.items.map((item: { productId: string }) => {
                    return {
                        productId: item.productId
                    }
                })
            }
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
                    clientId: invoice.clientId,
                    items: invoice.items,
                    total: invoice.total
                }
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}