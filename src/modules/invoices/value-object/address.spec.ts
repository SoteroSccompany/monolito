import Address from "./address";


describe("Address value object test", () => {

    it("should create a valid address", () => {
        expect(() => new Address("Rua 1", 123, "Casa 1", "Cidade 1", "Estado 1", "12345678")).not.toThrow();
    });

    it("should throw an error if street is empty", () => {
        expect(() => new Address("", 123, "Casa 1", "Cidade 1", "Estado 1", "12345678")).toThrow(new Error('Street is required'));
    });

    it("should throw an error if number is empty", () => {
        expect(() => new Address("Rua 1", null, "Casa 1", "Cidade 1", "Estado 1", "12345678")).toThrow(new Error('Number is required'));
    });

    it("should throw an error if city is empty", () => {
        expect(() => new Address("Rua 1", 123, "Casa 1", "", "Estado 1", "12345678")).toThrow(new Error('City is required'));
    });

    it("should throw an error if state is empty", () => {
        expect(() => new Address("Rua 1", 123, "Casa 1", "Cidade 1", "", "12345678")).toThrow(new Error('State is required'));
    });

    it("should throw an error if zipCode is empty", () => {
        expect(() => new Address("Rua 1", 123, "Casa 1", "Cidade 1", "Estado 1", "")).toThrow(new Error('ZipCode is required'));
    });

    it("should throw an error if zipCode has less than 8 characters", () => {
        expect(() => new Address("Rua 1", 123, "Casa 1", "Cidade 1", "Estado 1", "1234567")).toThrow(new Error('ZipCode must have 8 characters'));
    });

    it("should throw an error if complement is empty", () => {
        expect(() => new Address("Rua 1", 123, "", "Cidade 1", "Estado 1", "12345678")).toThrow(new Error('Complement is required'));
    });

    it("should return a string with address data", () => {
        const address = new Address("Rua 1", 123, "Casa 1", "Cidade 1", "Estado 1", "12345678");
        expect(address.toString()).toBe("Rua 1, 123, Casa 1, Cidade 1, Estado 1, 12345678");
    });

    it("should return a json string with address data", () => {
        const address = new Address("Rua 1", 123, "Casa 1", "Cidade 1", "Estado 1", "12345678");
        const json = address.toJson(address.toString());
        expect(json).toEqual(address);
    });



});