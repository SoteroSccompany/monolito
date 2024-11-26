import express, { Request, Response } from 'express';
import ClientRepository from '../../../modules/client-adm/repository/client.repository';
import AddClientUsecase from '../../../modules/client-adm/usecase/add-client/add-client.usecase';
import Address from '../../../modules/@shared/value-object/address';


export const clientRoute: any = express.Router();


clientRoute.post('/', async (req: Request, res: Response) => {
    const repository = new ClientRepository();
    const usecase = new AddClientUsecase(repository);
    try {
        let msg: string = '';
        let error: boolean = false;
        const input = {
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: {
                street: req.body.address.street,
                number: req.body.address.number,
                complement: req.body.address.complement,
                city: req.body.address.city,
                state: req.body.address.state,
                zipcode: req.body.address.zipcode
            }
        }
        if (!input.name) {
            msg = 'Name is required';
            error = true;
        }
        if (!input.email) {
            msg += error ? ', Email is required' : 'Email is required';
            error = true;
        }
        if (!input.document) {
            msg += error ? ', Document is required' : 'Document is required';
            error = true;
        }
        if (!input.address.street) {
            msg += error ? ', Street is required' : 'Street is required';
            error = true;
        }
        if (!input.address.number) {
            msg += error ? ', Number is required' : 'Number is required';
            error = true;
        }
        if (!input.address.complement) {
            msg += error ? ', Complement is required' : 'Complement is required';
            error = true;
        }
        if (!input.address.city) {
            msg += error ? ', City is required' : 'City is required';
            error = true;
        }

        if (!input.address.state) {
            msg += error ? ', State is required' : 'State is required';
            error = true;
        }
        if (!input.address.zipcode) {
            msg += error ? ', Zipcode is required' : 'Zipcode is required';
            error = true;
        }
        if (error) {
            res.status(400).send(msg);
            return;
        }
        const output = await usecase.execute({ ...input, address: new Address(input.address.street, input.address.number, input.address.complement, input.address.city, input.address.state, input.address.zipcode) });
        res.status(200).send(output);
    } catch (error) {
        console.log(error)
        res.status(500).send((error as Error).message);
    }
});
