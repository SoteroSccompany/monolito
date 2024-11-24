
import Address from "../../../@shared/value-object/address";
import Invoice from "./invoice";
import InvoiceItem from "./invoice-item";



describe("Invoice entity test", () => {

    it("should create a valid invoice", () => {
        expect(() => {
            new Invoice("Name", "Document", new Address("Street", 123, "Complement", "City", "State", "12345678"), [new InvoiceItem("Item 1", 100)]);
        }).not.toThrow();
    });

    it("should create a valid invoice", () => {
        const invoice = new Invoice("Name", "Document", new Address("Street", 123, "Complement", "City", "State", "12345678"), [new InvoiceItem("Item 1", 100)]);
        expect(invoice.name).toBe("Name");
        expect(invoice.document).toBe("Document");
        expect(invoice.address).toBeDefined();
        expect(invoice.address.street).toBe("Street");
        expect(invoice.address.number).toBe(123);
        expect(invoice.address.complement).toBe("Complement");
        expect(invoice.address.city).toBe("City");
        expect(invoice.address.state).toBe("State");
        expect(invoice.address.zipCode).toBe("12345678");
        expect(invoice.items.length).toBe(1);
        expect(invoice.items[0].name).toBe("Item 1");
        expect(invoice.items[0].price).toBe(100);
        expect(invoice.id).toBeDefined();
        expect(invoice.createdAt).toBeDefined();
        expect(invoice.updatedAt).toBeDefined();


    });

    it("should throw an error if name is empty", () => {
        expect(() => {
            new Invoice("", "Document", new Address("Street", 123, "Complement", "City", "State", "12345678"), [new InvoiceItem("Item 1", 100)]);
        }).toThrow(new Error('Name is required'));
    });

    it("should throw an error if document is empty", () => {
        expect(() => {
            new Invoice("Name", "", new Address("Street", 123, "Complement", "City", "State", "12345678"), [new InvoiceItem("Item 1", 100)]);
        }).toThrow(new Error('Document is required'));
    });

    it("should throw an error if address is empty", () => {
        expect(() => {
            new Invoice("Name", "Document", null, [new InvoiceItem("Item 1", 100)]);
        }).toThrow(new Error('Address is required'));
    });

    it("should throw an error if items is empty", () => {
        expect(() => {
            new Invoice("Name", "Document", new Address("Street", 123, "Complement", "City", "State", "12345678"), []);
        }).toThrow(new Error('Items is required'));
    });

    it("should add an item to invoice", () => {
        const invoice = new Invoice("Name", "Document", new Address("Street", 123, "Complement", "City", "State", "12345678"), [new InvoiceItem("Item 1", 100)]);
        invoice.addItem(new InvoiceItem("Item 2", 200));
        expect(invoice.items.length).toBe(2);
    });

    it("should throw an error en remove item from invoice", () => {
        const invoice = new Invoice("Name", "Document", new Address("Street", 123, "Complement", "City", "State", "12345678"), [new InvoiceItem("Item 1", 100)]);
        const items = invoice.items;
        expect(() => {
            invoice.removeItem(items[0]);
        }).toThrow(new Error('Items is required'));
    })

    it("should total invoice", () => {
        const invoice = new Invoice("Name", "Document", new Address("Street", 123, "Complement", "City", "State", "12345678"), [new InvoiceItem("Item 1", 100), new InvoiceItem("Item 2", 200)]);
        expect(invoice.total).toBe(300);
    });



});