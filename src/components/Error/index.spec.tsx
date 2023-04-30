import { renderWithTheme } from "../../../.jest";
import { Error } from ".";

describe("Error", () => {
	it("renders the children", () => {
		const { getByText } = renderWithTheme(<Error>Test</Error>);
		expect(getByText("Test")).toBeInTheDocument();
	});
});
