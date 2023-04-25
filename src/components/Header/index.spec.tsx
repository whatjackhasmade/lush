import { render } from "@testing-library/react";
import { Header } from ".";

describe("Header", () => {
	it("should render correctly", () => {
		const { container } = render(<Header />);
		expect(container).not.toBeEmptyDOMElement();
	});
});
