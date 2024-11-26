import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto, GetProductFacdeInputDto, GetProductFacdeOutputDto } from "./product-adm.facade.dto";


export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>;
    checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
    findProduct(input: GetProductFacdeInputDto): Promise<GetProductFacdeOutputDto>;
}