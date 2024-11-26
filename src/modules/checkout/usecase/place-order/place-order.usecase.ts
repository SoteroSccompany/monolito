import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Address from "../../../@shared/value-object/address";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../../invoices/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";



export default class PlaceOrderUseCase implements UseCaseInterface {

    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogFacadeInterface;
    private _repository: CheckoutGateway;
    private _invoiceFacade: InvoiceFacadeInterface;
    private _paymentFaccade: PaymentFacadeInterface;

    constructor(clientFacade: ClientAdmFacadeInterface, productAdmFacade: ProductAdmFacadeInterface,
        catalogStoreFacade: StoreCatalogFacadeInterface, repository: CheckoutGateway, invoiceFacade: InvoiceFacadeInterface,
        paymentFacade: PaymentFacadeInterface
    ) {
        this._clientFacade = clientFacade;
        this._productFacade = productAdmFacade;
        this._catalogFacade = catalogStoreFacade;
        this._repository = repository;
        this._invoiceFacade = invoiceFacade;
        this._paymentFaccade = paymentFacade;
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

            const payment = await this._paymentFaccade.process({
                orderId: order.id.id,
                amount: order.total
            });

            const invoice =
                payment.status === "approved" ?
                    await this._invoiceFacade.generateInvoice({
                        clientId: order.client.id.id,
                        items: order.products.map(p => ({
                            id: p.id.id,
                            name: p.name,
                            price: p.salesPrice
                        }))
                    }) : null;

            payment.status === "approved" && order.approve();
            this._repository.addOrder(order);
            return {
                id: order.id.id,
                invoiceId: payment.status === "approved" ? invoice.id : null,
                status: order.status,
                total: order.total,
                products: order.products.map(p => {
                    return {
                        productId: p.id.id,
                    }
                })
            }
        } catch (error) {
            console.log(error)
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
            if (product.salesPrice === null) {
                throw new Error("Product is not available for sale")
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