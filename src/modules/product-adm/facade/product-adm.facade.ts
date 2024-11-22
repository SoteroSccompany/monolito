import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.dto";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";


export interface UseCasesProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUseCase: UseCaseInterface;
    private _checkStockUseCase: UseCaseInterface;

    constructor(usecaseProps: UseCasesProps) {
        this._addUseCase = usecaseProps.addUseCase;
        this._checkStockUseCase = usecaseProps.stockUseCase
    }


    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        //Caso o dto da facade for != do dto do usecase, é necessário fazer a conversão
        return this._addUseCase.execute(input);
    }
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
        //Caso o dto da facade for != do dto do usecase, é necessário fazer a conversão
        return this._checkStockUseCase.execute(input);
    }

}