import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";


export default class ProductRepository implements ProductGateway {


    async add(product: Product): Promise<void> {
        try {
            await ProductModel.create({
                id: product.id.id,
                name: product.name,
                description: product.description,
                purchasePrice: product.purchasePrice,
                stock: product.stock,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }


    async find(id: string): Promise<Product> {
        try {
            const response = await ProductModel.findOne({ where: { id } });
            if (!response) {
                throw new Error(`Product with id ${id} not found`);
            }
            return new Product({
                id: new Id(response.id),
                name: response.name,
                description: response.description,
                purchasePrice: response.purchasePrice,
                stock: response.stock
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}