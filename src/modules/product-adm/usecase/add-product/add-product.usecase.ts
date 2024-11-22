import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";


export default class AddProductUseCase implements UseCaseInterface {

    private _productRepository: ProductGateway;

    constructor(repository: ProductGateway) {
        this._productRepository = repository;
    }

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
        try {
            const props = {
                id: new Id(input.id),
                name: input.name,
                description: input.description,
                purchasePrice: input.purchasePrice,
                stock: input.stock,
            }
            const product = new Product(props);
            await this._productRepository.add(product);
            return {
                id: product.id.id, //Se tem asim pq ele herda da base entity
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