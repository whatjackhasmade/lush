import { renderWithTheme } from "../../../.jest/renderWithTheme";
import { Header } from ".";

describe("Header", () => {
	it("should render correctly", () => {
		const { container } = renderWithTheme(<Header />);
		expect(container).not.toBeEmptyDOMElement();
	});
});
