import { renderWithTheme } from "../../../.jest";

import { Icon } from ".";

describe("Icon", () => {
	it("should render icon with role presentation", () => {
		const { queryByRole } = renderWithTheme(<Icon.Bag />);
		expect(queryByRole("img")).not.toBeInTheDocument();
	});

	it("should render icon with role img", () => {
		const { getByRole } = renderWithTheme(<Icon.Bag label="foo" />);
		const svg = getByRole("img");
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute("aria-label", "foo");
	});
});
