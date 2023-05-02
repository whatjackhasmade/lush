import { renderWithTheme } from "../../../.jest";
import { ErrorHero } from ".";
import { axe } from "jest-axe";

describe("ErrorHero", () => {
	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(
			<ErrorHero title="example">Test</ErrorHero>
		);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("renders the children", () => {
		const { getByText } = renderWithTheme(
			<ErrorHero title="example">Test</ErrorHero>
		);
		expect(getByText("Test")).toBeInTheDocument();
	});
});
