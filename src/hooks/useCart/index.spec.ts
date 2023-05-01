import { renderHook, act } from "@testing-library/react";
import { useCart } from "./index";
import { CartProvider } from "lush/context";
import { ProductFragment } from "lush/schema";

const mockProduct: ProductFragment = {
	id: "product-1",
	name: "Product 1",
	attributes: [],
	created: "",
	updatedAt: "",
	metadata: [],
	productType: {
		id: "product-type-1",
		slug: "product-type-1",
	},
	pricing: {
		priceRange: {
			stop: {
				gross: {
					amount: 10,
					currency: "GBP",
				},
				currency: "GBP",
				net: {
					amount: 10,
					currency: "GBP",
				},
				tax: {
					amount: 0,
					currency: "GBP",
				},
			},
		},
	},
	slug: "product-1",
	description: "",
};

describe("useCart", () => {
	it("should add a product to the cart", () => {
		const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

		expect(result.current.cart.length).toEqual(0);

		act(() => {
			result.current.addToCart(mockProduct);
		});

		expect(result.current.cart.length).toEqual(1);
		expect(result.current.cart[0].product).toEqual(mockProduct);
		expect(result.current.cart[0].quantity).toEqual(1);
	});

	it("should add a product to the cart with a quantity", () => {
		const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

		expect(result.current.cart.length).toEqual(0);

		act(() => {
			result.current.addToCart(mockProduct, 2);
		});

		expect(result.current.cart.length).toEqual(1);
		expect(result.current.cart[0].product).toEqual(mockProduct);
		expect(result.current.cart[0].quantity).toEqual(2);
	});

	it("should update a product when adding to the cart if it already exists", () => {
		const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

		expect(result.current.cart.length).toEqual(0);

		act(() => {
			result.current.addToCart(mockProduct);
		});

		expect(result.current.cart.length).toEqual(1);
		expect(result.current.cart[0].product).toEqual(mockProduct);
		expect(result.current.cart[0].quantity).toEqual(1);

		act(() => {
			result.current.addToCart(mockProduct);
		});

		expect(result.current.cart.length).toEqual(1);
		expect(result.current.cart[0].product).toEqual(mockProduct);
		expect(result.current.cart[0].quantity).toEqual(2);
	});

	it("should remove a product from the cart", () => {
		const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

		expect(result.current.cart.length).toEqual(0);

		act(() => {
			result.current.addToCart(mockProduct);
		});

		expect(result.current.cart.length).toEqual(1);

		act(() => {
			result.current.removeFromCart(mockProduct.id);
		});

		expect(result.current.cart.length).toEqual(0);
	});

	it("should allow setting of quantity of a product in the cart", () => {
		const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

		expect(result.current.cart.length).toEqual(0);

		act(() => {
			result.current.addToCart(mockProduct);
		});

		expect(result.current.cart.length).toEqual(1);
		expect(result.current.cart[0].quantity).toEqual(1);

		act(() => {
			result.current.quantitySet({
				productId: mockProduct.id,
				quantity: 5,
			});
		});

		expect(result.current.cart.length).toEqual(1);
		expect(result.current.cart[0].quantity).toEqual(5);
	});

	it("should return true when isInCart is called with a product that is in the cart", () => {
		const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

		expect(result.current.cart.length).toEqual(0);

		act(() => {
			result.current.addToCart(mockProduct);
		});

		expect(result.current.cart.length).toEqual(1);

		expect(result.current.isInCart(mockProduct.id)).toEqual(true);
	});

	it("should return false when isInCart is called with a product that is not in the cart", () => {
		const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

		expect(result.current.cart.length).toEqual(0);

		expect(result.current.isInCart(mockProduct.id)).toEqual(false);
	});

	it("calculates costTotal correctly", () => {
		const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

		expect(result.current.cart.length).toEqual(0);

		act(() => {
			result.current.addToCart(mockProduct, 2);
		});

		expect(result.current.cart.length).toEqual(1);
		expect(result.current.costTotal).toEqual({
			currency: "GBP",
			amount: 20,
		});

		act(() => {
			result.current.addToCart(mockProduct, 2);
		});

		expect(result.current.costTotal).toEqual({
			currency: "GBP",
			amount: 40,
		});
	});

	it("calculates when cart has free delivery", () => {
		const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

		expect(result.current.cart.length).toEqual(0);

		act(() => {
			result.current.addToCart(mockProduct, 2);
		});

		expect(result.current.cart.length).toEqual(1);
		expect(result.current.hasFreeDelivery).toEqual(false);

		act(() => {
			result.current.addToCart(mockProduct, 5);
		});

		expect(result.current.hasFreeDelivery).toEqual(true);
	});
});
