import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutPutDto } from "./invoice.facade.dto";



export default interface InvoiceFacadeInterface {
    generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutPutDto>;
    findInvoice(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}