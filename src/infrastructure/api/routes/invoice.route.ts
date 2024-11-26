import express, { Request, Response } from 'express';
import InvoiceRepository from '../../../modules/invoices/repository/invoice.repository';
import FindInvoiceUsecase from '../../../modules/invoices/usecase/find-invoice/find-invoice.usecase';


export const invoiceRoute: any = express.Router();


invoiceRoute.get('/:id', async (req: Request, res: Response) => {

    try {
        let msg: string = '';
        let error: boolean = false;
        const input = {
            id: req.params.id
        }
        if (input.id === undefined || input.id === null || input.id === '') {
            error = true;
            msg = 'id is required';
        }
        if (error) {
            res.status(400).send(msg);
            return;
        }
        const repository = new InvoiceRepository();
        const usecase = new FindInvoiceUsecase(repository);
        const output = await usecase.execute(input)
        res.status(200).send(output);
    } catch (error) {
        console.log(error)
        res.status(500).send((error as Error).message);
    }
});
