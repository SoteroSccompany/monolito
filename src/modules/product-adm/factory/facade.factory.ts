import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";



export default class ProductAdmFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const checkProductUseCase = new CheckStockUseCase(productRepository);
        const findProductUseCase = new FindProductUseCase(productRepository);
        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUseCase,
            stockUseCase: checkProductUseCase,
            findProductUseCase: findProductUseCase
        })
        return productFacade;
    }
}