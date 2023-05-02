import { renderWithTheme } from "../../../.jest";
import { DefaultLayout, mainId } from ".";
import { useCart } from "lush/hooks";
import { axe } from "jest-axe";

const mockRenderCart = jest.fn(() => null);

jest.mock("lush/components/cart", () => ({
	Cart: () => mockRenderCart(),
}));

jest.mock("lush/hooks/useCart", () => ({
	useCart: jest.fn(() => ({
		pullout: { isOpen: false },
	})),
}));

describe("DefaultLayout", () => {
	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(<DefaultLayout>Test</DefaultLayout>);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("renders the children", () => {
		const { getByText } = renderWithTheme(<DefaultLayout>Test</DefaultLayout>);
		expect(getByText("Test")).toBeInTheDocument();
	});

	it("renders skip to content link", () => {
		const { getByRole } = renderWithTheme(<DefaultLayout>Test</DefaultLayout>);

		const skipToContentLink = getByRole("link", { name: "skipToContent" });
		expect(skipToContentLink).toBeInTheDocument();
		expect(skipToContentLink).toHaveAttribute("href", `#${mainId}`);
	});

	it("doesn't show Cart component by default", () => {
		renderWithTheme(<DefaultLayout>Test</DefaultLayout>);
		expect(mockRenderCart).not.toHaveBeenCalled();
	});

	it("shows Cart component when pullout is open", () => {
		(useCart as jest.Mock).mockReturnValueOnce({
			pullout: { isOpen: true },
		});

		renderWithTheme(<DefaultLayout>Test</DefaultLayout>);
		expect(mockRenderCart).toHaveBeenCalled();
	});
});
