import { renderWithTheme } from "../../../.jest";
import { Container } from ".";
import { axe } from "jest-axe";

describe("Container", () => {
	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(<Container>Test</Container>);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("renders the children", () => {
		const { getByText } = renderWithTheme(<Container>Test</Container>);
		expect(getByText("Test")).toBeInTheDocument();
	});
});
