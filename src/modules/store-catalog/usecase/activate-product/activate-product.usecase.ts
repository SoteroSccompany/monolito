import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { ActivateProductInputDto, ActivateProductOutputDto } from "./activate-product.dto";


type ActivateProductProps = {
    facadeProductAdm: ProductAdmFacadeInterface;
    repository: ProductGateway;
}

export default class ActivateProductUseCase implements UseCaseInterface {

    private _facadeProductAdm: ProductAdmFacadeInterface;
    private _repository: ProductGateway;

    constructor(props: ActivateProductProps) {
        this._facadeProductAdm = props.facadeProductAdm;
        this._repository = props.repository;
    }

    async execute(input: ActivateProductInputDto): Promise<ActivateProductOutputDto> {
        const productFacade = await this.getProduct(input.id);
        const product = new Product({
            id: new Id(productFacade.id),
            name: productFacade.name,
            description: productFacade.description,
            salesPrice: null
        })
        product.changeSalesPrice(productFacade.purchasePrice);
        await this._repository.update(product);
        return {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        }
    }

    private async getProduct(id: string) {
        const product = await this._facadeProductAdm.findProduct({ productId: id });
        return product;
    }
}