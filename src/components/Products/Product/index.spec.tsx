import { render } from "@testing-library/react";
import { Product } from ".";

describe("Product", () => {
	it("should render correctly", () => {
		const { container } = render(<Product />);
		expect(container).not.toBeEmptyDOMElement();
	});
});
