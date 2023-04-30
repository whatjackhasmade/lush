import { renderWithTheme } from "../../../.jest";
import { Hero } from ".";

describe("Hero", () => {
	it("renders no heading when title is empty string", () => {
		const { queryByRole } = renderWithTheme(<Hero title="" />);
		expect(queryByRole("heading")).not.toBeInTheDocument();
	});

	it("renders heading when title is not empty string", () => {
		const { getByRole } = renderWithTheme(<Hero title="foo" />);
		const heading = getByRole("heading");
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent("foo");
	});

	it("renders no image when image is undefined", () => {
		const { queryByRole } = renderWithTheme(<Hero title="foo" />);
		expect(queryByRole("img")).not.toBeInTheDocument();
	});

	it("renders image when image is defined", () => {
		const { getByRole } = renderWithTheme(
			<Hero title="foo" image={{ src: "/foo", height: 1, width: 1 }} />
		);
		expect(getByRole("img")).toBeInTheDocument();
	});
});
