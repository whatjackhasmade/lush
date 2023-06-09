import { renderWithTheme } from "../../../../.jest";
import { Product } from ".";
import { axe } from "jest-axe";

describe("Product", () => {
	const product = {
		id: "1",
		attributes: [],
		created: "2021-01-01T00:00:00.000Z",
		updatedAt: "2021-02-01T00:00:00.000Z",
		metadata: [],
		name: "Test product",
		slug: "test-product",
		productType: {
			id: "1",
			slug: "test-product-type",
		},
		pricing: {
			priceRange: {
				stop: {
					gross: {
						amount: 100,
						currency: "GBP",
					},
					net: {
						amount: 100,
						currency: "GBP",
					},
					tax: {
						amount: 0,
						currency: "GBP",
					},
					currency: "GBP",
				},
			},
		},
	};

	it("should render correctly", () => {
		const { container } = renderWithTheme(<Product product={product} />);
		expect(container).not.toBeEmptyDOMElement();
	});

	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(<Product product={product} />);
		expect(await axe(container)).toHaveNoViolations();
	});
});
