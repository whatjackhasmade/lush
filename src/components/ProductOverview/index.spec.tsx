import { renderWithTheme } from "../../../.jest";
import { ProductOverview } from ".";
import { ProductFragment } from "lush/schema";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockRenderBlocks = jest.fn((_) => null);

const mockRenderGallery = jest.fn(() => null);
const mockRenderSidebar = jest.fn(() => null);

jest.mock("lush/components", () => ({
	...jest.requireActual("lush/components"),
	Blocks: (props: any) => mockRenderBlocks(props),
	Skeleton: () => <div data-testid="skeleton" />,
}));

jest.mock("./Gallery", () => ({
	Gallery: () => mockRenderGallery(),
}));

jest.mock("./Sidebar", () => ({
	Sidebar: () => mockRenderSidebar(),
}));

describe("ProductOverview", () => {
	it("renders", () => {
		renderWithTheme(<ProductOverview />);

		expect(mockRenderBlocks).toHaveBeenCalled();
		expect(mockRenderGallery).toHaveBeenCalled();
		expect(mockRenderSidebar).toHaveBeenCalled();
	});

	it("renders skeleton when loading", () => {
		const { getAllByTestId } = renderWithTheme(<ProductOverview loading />);

		expect(mockRenderGallery).toHaveBeenCalled();
		expect(mockRenderSidebar).toHaveBeenCalled();

		expect(mockRenderBlocks).not.toHaveBeenCalled();
		expect(getAllByTestId("skeleton")).toHaveLength(6);
	});

	it("calls render blocks with product description", () => {
		renderWithTheme(
			<ProductOverview
				product={
					{
						description: "test",
					} as ProductFragment
				}
			/>
		);

		expect(mockRenderBlocks).toHaveBeenCalled();
		expect(mockRenderBlocks).toHaveBeenCalledWith({
			value: "test",
		});
	});

	it("calls render blocks without product description", () => {
		renderWithTheme(<ProductOverview />);

		expect(mockRenderBlocks).toHaveBeenCalled();
		expect(mockRenderBlocks).toHaveBeenCalledWith({
			value: undefined,
		});
	});
});
