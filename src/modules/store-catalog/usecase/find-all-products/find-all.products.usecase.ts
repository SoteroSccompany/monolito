import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";



export default class FindAllProductsUsecase implements UseCaseInterface {
    private _productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this._productRepository = productRepository;
    }


    async execute(): Promise<FindAllProductsDto> {
        try {
            const products = await this._productRepository.findAll();
            if (!products) throw new Error('Products not found');
            return {
                products: products.map(product => {
                    return {
                        id: product.id.id,
                        name: product.name,
                        description: product.description,
                        salesPrice: product.salesPrice
                    }
                })
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}