import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUsecase implements UseCaseInterface {
    constructor(private _productRepository: ProductGateway) { }

    async execute(id: FindProductInputDto): Promise<FindProductOutputDto> {
        try {
            const product = await this._productRepository.find(id.id)
            if (!product) throw new Error('Product not found')
            return {
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }


}