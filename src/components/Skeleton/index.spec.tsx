import { axe } from "jest-axe";
import { Skeleton } from ".";
import { renderWithTheme } from "../../../.jest";

describe("Skeleton", () => {
	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(<Skeleton />);
		expect(await axe(container)).toHaveNoViolations();
	});
});
