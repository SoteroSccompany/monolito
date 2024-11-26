import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import InvoiceItemModel from '../../modules/invoices/repository/invoice-item.model';
import InvoiceModel from '../../modules/invoices/repository/invoice.model';
import ClientModel from '../../modules/client-adm/repository/client.model';
import TransactionModel from '../../modules/payment/repository/transaction.model';
import ProductModel from '../../modules/product-adm/repository/product.model';
import ProductModelCatalog from '../../modules/store-catalog/repository/product.model'
import { migrator } from '../migrations/config/migrator';
import { Umzug } from 'umzug';
import { productRoute } from './routes/product.route';
import { clientRoute } from './routes/client.route';
import { checkoutRoute } from './routes/checkout.route';
import CheckOutModel from '../../modules/checkout/repository/checkout.model';
import { invoiceRoute } from './routes/invoice.route';

export const app: Express = express();
app.use(express.json());
app.use('/products', productRoute);
app.use('/clients', clientRoute);
app.use('/checkout', checkoutRoute);
app.use('/invoices', invoiceRoute);


export let sequelize: Sequelize;
export let migration: Umzug<any>;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'db.sqlite',
        logging: false
    });
    await sequelize.addModels([ClientModel, CheckOutModel, InvoiceModel, InvoiceItemModel, TransactionModel, ProductModel, ProductModelCatalog]);

    migration = migrator(sequelize);
    await migration.up();
}

setupDb();