import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/entity/invoice";
import InvoiceEntityFactory from "../domain/factory/entity.factory";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";


export default class InvoiceRepository implements InvoiceGateway {

    async add(invoice: Invoice): Promise<void> {
        try {
            await InvoiceModel.create({
                id: invoice.id.id,
                clientId: invoice.clientId,
                items: invoice.items.map(item => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price
                })),
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt
            }, {
                include: [{ model: InvoiceItemModel, as: 'items' }]
            });

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
    async find(id: string): Promise<Invoice> {
        try {
            const invoice = await InvoiceModel.findOne({
                where: { id },
                include: [{ model: InvoiceItemModel, as: 'items' }]
            });
            if (!invoice) throw new Error('Invoice not found');
            return InvoiceEntityFactory.create(invoice);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}