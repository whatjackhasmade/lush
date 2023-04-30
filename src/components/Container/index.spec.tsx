import { renderWithTheme } from "../../../.jest";
import { Container } from ".";

describe("Container", () => {
	it("renders the children", () => {
		const { getByText } = renderWithTheme(<Container>Test</Container>);
		expect(getByText("Test")).toBeInTheDocument();
	});
});
