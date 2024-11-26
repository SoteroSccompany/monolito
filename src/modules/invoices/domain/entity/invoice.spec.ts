
import Address from "../../../@shared/value-object/address";
import Invoice from "./invoice";
import InvoiceItem from "./invoice-item";



describe("Invoice entity test", () => {

    it("should create a valid invoice", () => {
        expect(() => {
            new Invoice("c1", [new InvoiceItem("Item 1", 100)]);
        }).not.toThrow();
    });

    it("should create a valid invoice", () => {
        const invoice = new Invoice("c1", [new InvoiceItem("Item 1", 100)]);
        expect(invoice.clientId).toBe("c1");
        expect(invoice.items.length).toBe(1);
        expect(invoice.items[0].name).toBe("Item 1");
        expect(invoice.items[0].price).toBe(100);
        expect(invoice.id).toBeDefined();
        expect(invoice.createdAt).toBeDefined();
        expect(invoice.updatedAt).toBeDefined();


    });



    it("should add an item to invoice", () => {
        const invoice = new Invoice("c1", [new InvoiceItem("Item 1", 100)]);
        invoice.addItem(new InvoiceItem("Item 2", 200));
        expect(invoice.items.length).toBe(2);
    });

    it("should throw an error en remove item from invoice", () => {
        const invoice = new Invoice("c1", [new InvoiceItem("Item 1", 100)]);
        const items = invoice.items;
        expect(() => {
            invoice.removeItem(items[0]);
        }).toThrow(new Error('Items is required'));
    })

    it("should total invoice", () => {
        const invoice = new Invoice("c1", [new InvoiceItem("Item 1", 100), new InvoiceItem("Item 2", 200)]);
        expect(invoice.total).toBe(300);
    });



});