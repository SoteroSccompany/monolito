
import Address from "../../../@shared/value-object/address";
import Invoice from "../entity/invoice";
import InvoiceEntityFactory from "./entity.factory";


describe("Entity factory test", () => {

    it("should create a invoice", () => {
        const invoice = InvoiceEntityFactory.create({
            clientId: 'c1',
            items: [
                {
                    name: 'Item 1',
                    price: 100
                },
                {
                    name: 'Item 2',
                    price: 200
                }
            ]
        });

        expect(invoice).toBeInstanceOf(Invoice);
        expect(invoice.items).toHaveLength(2);
        expect(invoice.clientId).toBe("c1");
        expect(invoice.items[0].name).toBe("Item 1");
        expect(invoice.items[0].price).toBe(100);
        expect(invoice.items[1].name).toBe("Item 2");
        expect(invoice.items[1].price).toBe(200);
        expect(invoice.id).toBeDefined();

    })

});