import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Address from "../../../@shared/value-object/address";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";



export default class PlaceOrderUseCase implements UseCaseInterface {

    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogFacadeInterface;

    constructor(clientFacade: ClientAdmFacadeInterface, productAdmFacade: ProductAdmFacadeInterface,
        catalogStoreFacade: StoreCatalogFacadeInterface) {
        this._clientFacade = clientFacade;
        this._productFacade = productAdmFacade;
        this._catalogFacade = catalogStoreFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        try {
            const client = await this._clientFacade.find({ clientId: input.clientId });
            if (!client) {
                throw new Error("Client not found");
            }
            await this.validateProducts(input)
            const products = await Promise.all(
                input.products.map(p => this.getProduct(p.productId))
            );
            const myClient = new Client({
                id: new Id(client.clientId),
                name: client.name,
                email: client.email,
                address: new Address(client.address.street, client.address.number, client.address.complement, client.address.city, client.address.state, client.address.zipCode)
            })
            const order = new Order({
                client: myClient,
                products: products
            });

            //processar o pagamento -> paymentfacade.process(orderid, amount)

            //Caso pagamento aprovado -> Gerar a fatura 
            //Mudar o status da order para approved 

            //retornar dto 

            return {
                id: "",
                invoiceId: "",
                status: "",
                total: 0,
                products: [],
            };


        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No products selected");
        }
        await this.validateSotck(input);
    }

    private async validateSotck(input: PlaceOrderInputDto): Promise<void> {
        for (const p of input.products) {
            const product = await this._productFacade.checkStock({ productId: p.productId });
            if (product.stock <= 0) {
                throw new Error(`Product ${product.productId} is not available in stock`);
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        try {
            const product = await this._catalogFacade.find({ id: productId });
            if (!product) {
                throw new Error("Product not found");
            }
            const productProps = {
                id: new Id(product.id),
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice
            }
            return new Product(productProps);
        } catch (error) {
            throw new Error((error as Error).message)
        }

    }

}