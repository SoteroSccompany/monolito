import express, { Request, Response } from 'express';
import AddProductUseCase from '../../../modules/product-adm/usecase/add-product/add-product.usecase';
import ProductRepository from '../../../modules/product-adm/repository/product.repository';
import ActivateProductUseCase from '../../../modules/store-catalog/usecase/activate-product/activate-product.usecase';
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/facade.factory';
import ProductCatalogRepository from '../../../modules/store-catalog/repository/product.repository';

export const productRoute: any = express.Router();


productRoute.post('/', async (req: Request, res: Response) => {
    const repository = new ProductRepository();
    const usecase = new AddProductUseCase(repository);
    try {
        let msg: string = '';
        let error: boolean = false;
        const input = {
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock
        }
        if (!input.name) {
            msg = 'Name is required';
            error = true;
        }
        if (!input.description) {
            msg += error ? ', Description is required' : 'Description is required';
            error = true;
        }
        if (!input.purchasePrice) {
            msg += error ? ', Purchase Price is required' : 'Purchase Price is required';
            error = true;
        }
        if (!input.stock) {
            msg += error ? ', Stock is required' : 'Stock is required';
            error = true;
        }
        if (error) {
            res.status(400).send(msg);
            return;
        }
        const output = await usecase.execute(input)
        res.status(200).send(output);
    } catch (error) {
        console.log(error)
        res.status(500).send((error as Error).message);
    }


    productRoute.get('/:id', async (req: Request, res: Response) => {

        const repository = new ProductCatalogRepository();
        const productAdmFacade = ProductAdmFacadeFactory.create();
        const usecase = new ActivateProductUseCase({
            facadeProductAdm: productAdmFacade,
            repository
        });
        try {
            let msg: string = '';
            let error: boolean = false;
            const input = {
                id: req.params.id
            }
            if (!input.id) {
                msg = 'Id is required';
                error = true;
            }
            if (error) {
                res.status(400).send(msg);
                return;
            }
            const output = await usecase.execute(input)
            res.status(200).send(output);
        } catch (error) {
            console.log(error)
            res.status(500).send((error as Error).message);
        }
    });
});
