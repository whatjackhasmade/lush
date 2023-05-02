import { renderWithTheme } from "../../../.jest";
import { Error } from ".";
import { axe } from "jest-axe";

describe("Error", () => {
	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(<Error>Test</Error>);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("renders the children", () => {
		const { getByText } = renderWithTheme(<Error>Test</Error>);
		expect(getByText("Test")).toBeInTheDocument();
	});
});
