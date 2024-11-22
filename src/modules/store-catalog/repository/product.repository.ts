import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";


export default class ProductRepository implements ProductGateway {


    async findAll(): Promise<Product[]> {
        try {
            const products = await ProductModel.findAll();
            if (!products) throw new Error('Products not found');
            return products.map(
                (product) =>
                    new Product({
                        id: new Id(product.id),
                        name: product.name,
                        description: product.description,
                        salesPrice: product.salesPrice
                    })
            );

        } catch (error) {
            throw new Error((error as Error).message)
        }
    }


    async find(id: string): Promise<Product> {
        try {
            const product = await ProductModel.findOne({ where: { id } });
            if (!product) throw new Error('Product not found');
            return new Product({
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            });
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

}