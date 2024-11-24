import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

const MockDate = new Date(2000, 1, 1);

describe("PlaceOrderUseCase unit test", () => {


    describe("validateProducts method", () => {
        //@ts-expect-error - no params in contructor
        const placeOrderUseCase = new PlaceOrderUseCase()
        it("should throw an error if no products are selected", async () => {
            const input: PlaceOrderInputDto = { clientId: "0", products: [] };
            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("No products selected"));
        });

        it("should throw an error when product is out of stock", async () => {
            const mockProductsFacade = {
                checkStock: jest.fn(({ productId }: { productId: string }) =>
                    Promise.resolve({ productId, stock: productId === "1" ? 0 : 1 })
                ),
            };
            //@ts-expect-error force set _productFacade
            placeOrderUseCase["_productFacade"] = mockProductsFacade;

            let input: PlaceOrderInputDto = { clientId: "0", products: [{ productId: "1" }] };

            await expect(placeOrderUseCase["validateProducts"](input))
                .rejects.toThrow(new Error(`Product 1 is not available in stock`));

            input = { clientId: "0", products: [{ productId: "0" }, { productId: "1" }] };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects
                .toThrow(new Error(`Product 1 is not available in stock`));
            expect(mockProductsFacade.checkStock).toHaveBeenCalledTimes(3);

            input = { clientId: "0", products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }] };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects
                .toThrow(new Error(`Product 1 is not available in stock`));
            expect(mockProductsFacade.checkStock).toHaveBeenCalledTimes(5);

        });

    });

    describe("getProductsMethod", () => {

        beforeAll(() => {
            jest.useFakeTimers({ now: MockDate.getTime() });

        });

        afterAll(() => {
            jest.useRealTimers();
        });

        //@ts-expect-error - no params in contructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it("should throw an error when product not found", async () => {

            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null)
            }

            //@ts-expect-error force set _productFacade
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(new Error("Product not found"));


        })

        it("should return a product", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue({ id: "0", name: "Product 0", description: "Product 0 description", salesPrice: 10 })
            }

            //@ts-expect-error force set _productFacade
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("0")).resolves.toEqual(
                new Product({
                    id: new Id("0"),
                    name: "Product 0",
                    description: "Product 0 description",
                    salesPrice: 10
                })
            );

            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);

        });


    });

    describe("execute method", () => {

        beforeAll(() => {
            jest.useFakeTimers({ now: MockDate.getTime() });

        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it("should throw an error when client not found", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null)
            }

            //@ts-expect-error - no params in contructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = { clientId: "0", products: [] };

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error("Client not found"));

        });

        it("should throw an error when products are not valid", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true)
            }

            //@ts-expect-error - no params in contructor
            const placeOrderUseCase = new PlaceOrderUseCase();

            const mockValidateProducts = jest
                //@ts-expect-error spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - not return never
                .mockRejectedValue(new Error("No products selected"));


            //@ts-expect-error force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = { clientId: "1", products: [] };

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error("No products selected"));
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        });


        describe("place an order", () => {
            const clientProps = {
                clientId: "1c",
                name: "Client 0",
                email: "client@user.com",
                address: {
                    street: "Client street",
                    number: "123",
                    complement: "Client complement",
                    city: "Client city",
                    state: "Client state",
                    zipCode: "12345678"
                }
            };

            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(Promise.resolve(clientProps)),
                add: jest.fn()
            };

            const mockPaymentFacade = {
                process: jest.fn()
            };

            const mockCheckoutRepository = {
                addOrder: jest.fn(),
                findOrder: jest.fn()
            }

            const mockInvoiceFacade = {
                generateInvoice: jest.fn().mockResolvedValue({ id: "1i" }),
                findInvoice: jest.fn()
            }

            const placeOrderUseCase = new PlaceOrderUseCase(
                mockClientFacade,
                null,
                null,
                mockCheckoutRepository,
                mockInvoiceFacade,
                mockPaymentFacade
            );

            const products = {
                "1": new Product({
                    id: new Id("1"),
                    name: "Product 1",
                    description: "Product 1 description",
                    salesPrice: 30
                }),
                "2": new Product({
                    id: new Id("2"),
                    name: "Product 2",
                    description: "Product 2 description",
                    salesPrice: 40
                }),
            }
            const mockValidateProducts = jest
                //@ts-expect-error spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - not return never
                .mockResolvedValue(null);

            const mockGetProduct = jest
                //@ts-expect-error spy on private method
                .spyOn(placeOrderUseCase, "getProduct")
                //@ts-expect-error - not return never
                .mockImplementation((productId: keyof typeof products) => {
                    return products[productId];
                });

            it("should not be approved", async () => {

                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transactionId: "1t",
                    orderId: "1o",
                    amount: 100,
                    status: "error",
                    createdAt: new Date(),
                    updatedAt: new Date()
                })

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [{ productId: "1" }, { productId: "2" }]
                };

                let output = await placeOrderUseCase.execute(input);

                expect(output.invoiceId).toBeNull();
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([{ productId: "1" }, { productId: "2" }]);
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({ clientId: "1c" });
                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);
                expect(mockGetProduct).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                })
                expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(0);

            });

            it("should be approved", async () => {

                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transactionId: "1t",
                    orderId: "1o",
                    amount: 100,
                    status: "approved",
                    createdAt: new Date(),
                    updatedAt: new Date()
                })

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [{ productId: "1" }, { productId: "2" }]
                };

                let output = await placeOrderUseCase.execute(input);

                expect(output.invoiceId).toBe("1i");
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([{ productId: "1" }, { productId: "2" }]);
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({ clientId: "1c" });
                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockGetProduct).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                })
                expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(1);
                expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledWith({
                    clientId: "1c",
                    items: [
                        {
                            id: products["1"].id.id,
                            name: products["1"].name,
                            price: products["1"].salesPrice
                        },
                        {
                            id: products["2"].id.id,
                            name: products["2"].name,
                            price: products["2"].salesPrice
                        }
                    ]
                });

            });



        });

    });


});