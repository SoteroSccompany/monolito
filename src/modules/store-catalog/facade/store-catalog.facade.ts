
import FindAllProductsUsecase from "../usecase/find-all-products/find-all.products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import { FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto, FindAllStoreCatalogFacadeOutputDto } from "./store-catalog.facade.dto";
import StoreCatalogFacadeInterface from "./store-catalog.interface";


export interface usecaseProps {
    findUsecase: FindProductUseCase;
    findAllUsecase: FindAllProductsUsecase;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {

    private _findUsecase: FindProductUseCase;
    private _findAllUsecase: FindAllProductsUsecase;

    constructor(props: usecaseProps) {
        this._findUsecase = props.findUsecase;
        this._findAllUsecase = props.findAllUsecase;
    }

    async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
        return await this._findUsecase.execute(id);

    }
    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
        return await this._findAllUsecase.execute();
    }

}