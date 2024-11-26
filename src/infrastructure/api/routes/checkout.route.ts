import express, { Request, Response } from 'express';
import CheckoutRepository from '../../../modules/checkout/repository/checkout.repository';
import PlaceOrderUseCase from '../../../modules/checkout/usecase/place-order/place-order.usecase';
import ClientAdmFactoryFacade from '../../../modules/client-adm/factory/facade.factory';
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/facade.factory';
import StoreCatalogFacadeFactory from '../../../modules/store-catalog/factory/facade.factory';
import FactoryFacade from '../../../modules/invoices/factory/facade.factory';
import PaymentFacadeFactory from '../../../modules/payment/factory/payment.facade.factory';


export const checkoutRoute: any = express.Router();


checkoutRoute.post('/', async (req: Request, res: Response) => {
    const repository = new CheckoutRepository();
    const clientFacade = ClientAdmFactoryFacade.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const invoiceFacade = FactoryFacade.create();
    const paymentFacade = PaymentFacadeFactory.create();

    const usecase = new PlaceOrderUseCase(
        clientFacade,
        productFacade,
        catalogFacade,
        repository,
        invoiceFacade,
        paymentFacade
    );
    try {
        let msg: string = '';
        let error: boolean = false;
        const input = {
            clientId: req.body.clientId,
            products: req.body.products
        }
        if (input.clientId === undefined || input.clientId === null || input.clientId === '') {
            error = true;
            msg = 'clientId is required';
        }
        if (input.products === undefined || input.products === null || input.products.length === 0) {
            error = true;
            msg = 'products is required';
        }
        const output = await usecase.execute(input)
        res.status(200).send(output);
    } catch (error) {
        console.log(error)
        res.status(500).send((error as Error).message);
    }
});
