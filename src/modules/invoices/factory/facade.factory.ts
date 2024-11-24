import ClientAdmFactoryFacade from "../../client-adm/factory/facade.factory";
import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generate-invoice.usecase";



export default class FactoryFacade {
    static create() {
        const repository = new InvoiceRepository();
        const findUsecase = new FindInvoiceUsecase(repository);
        const facadeClientAdm = ClientAdmFactoryFacade.create();
        const generateUseCase = new GenerateInvoiceUsecase(repository, facadeClientAdm);
        const facade = new InvoiceFacade(generateUseCase, findUsecase);
        return facade;
    }
}