
import Address from "../../../@shared/value-object/address";
import Invoice from "../entity/invoice";
import InvoiceEntityFactory from "./entity.factory";


describe("Entity factory test", () => {

    it("should create a invoice", () => {
        const invoice = InvoiceEntityFactory.create({
            name: 'John Doe',
            document: '123456789',
            street: 'Rua 1',
            number: 123,
            complement: 'Casa',
            city: 'Cidade',
            state: 'Estado',
            zipCode: '12345678',
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
        expect(invoice.name).toBe('John Doe');
        expect(invoice.document).toBe('123456789');
        expect(invoice.address).toBeInstanceOf(Address);
        expect(invoice.items).toHaveLength(2);


    })

});