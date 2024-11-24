import InvoiceItem from "./invoice-item";


describe("InvoiceItem entity test", () => {

    it("should create a valid invoice item", () => {
        expect(() => {
            new InvoiceItem("Item 1", 100);
        }).not.toThrow();
    });

    it("should create a valid invoice item", () => {
        const invoice = new InvoiceItem("Item 1", 100);
        expect(invoice.name).toBe("Item 1");
        expect(invoice.price).toBe(100);
        expect(invoice.id).toBeDefined();
        expect(invoice.createdAt).toBeDefined();
        expect(invoice.updatedAt).toBeDefined();
    })

    it("should throw an error if name is empty", () => {
        expect(() => {
            new InvoiceItem("", 100);
        }).toThrow(new Error('Name is required'));
    });

    it("should throw an error if price is empty", () => {
        expect(() => {
            new InvoiceItem("Item 1", null);
        }).toThrow(new Error('Price is required'));
    });

    it("should throw an error if price is less than 100", () => {
        expect(() => {
            new InvoiceItem("Item 1", 99);
        }).toThrow(new Error('Price must be greater than 100'));
    });


});