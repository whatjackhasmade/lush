import { renderWithTheme } from "../../../../.jest";
import { Gallery } from ".";
import { ProductFragment } from "lush/schema";
import { axe } from "jest-axe";

jest.mock("lush/components", () => ({
	...jest.requireActual("lush/components"),
	Skeleton: () => <div data-testid="skeleton" />,
}));

describe("Gallery", () => {
	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(
			<Gallery
				product={
					{
						media: [
							{
								id: "1",
								url: "foo",
								alt: "foo",
							},
							{
								id: "2",
								url: "bar",
								alt: "bar",
							},
						],
					} as ProductFragment
				}
			/>
		);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("skips rendering when not loading and no gallery", () => {
		const { container } = renderWithTheme(<Gallery />);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders", () => {
		const { getByRole } = renderWithTheme(
			<Gallery
				product={
					{
						media: [
							{
								id: "1",
								url: "foo",
								alt: "foo",
							},
							{
								id: "2",
								url: "bar",
								alt: "bar",
							},
						],
					} as ProductFragment
				}
			/>
		);

		expect(getByRole("img", { name: "foo" })).toBeInTheDocument();
		expect(getByRole("img", { name: "bar" })).toBeInTheDocument();
	});

	it("renders skeleton when loading", () => {
		const { getAllByTestId } = renderWithTheme(<Gallery loading />);

		expect(getAllByTestId("skeleton")).toHaveLength(3);
	});
});
