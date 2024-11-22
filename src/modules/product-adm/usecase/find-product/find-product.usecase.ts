import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";


export default class FindProductUseCase implements UseCaseInterface {

    private _productRepository: ProductGateway;

    constructor(repository: ProductGateway) {
        this._productRepository = repository;
    }

    async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
        try {
            const product = await this._productRepository.find(input.id);
            return {
                id: product.id.id,
                name: product.name,
                description: product.description,
                purchasePrice: product.purchasePrice,
                stock: product.stock,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }



}