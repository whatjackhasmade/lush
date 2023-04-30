import { Metadata } from ".";

import { renderWithTheme } from "../../../.jest";
import { App } from "../../enums";

jest.mock("next/head", () => ({
	__esModule: true,
	default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Metadata", () => {
	it("should render default head elements", () => {
		renderWithTheme(<Metadata />);

		const title = document.querySelector("title");
		expect(title).toBeInTheDocument();
		expect(title).toHaveTextContent(App.Name);

		const description = document.querySelector("meta[name=description]");
		expect(description).toBeInTheDocument();
		expect(description).toHaveAttribute("content", App.Description);
	});

	it("should render title with custom title", () => {
		renderWithTheme(<Metadata title="foo" />);

		const title = document.querySelector("title");
		expect(title).toBeInTheDocument();
		expect(title).toHaveTextContent("foo | " + App.Name);
	});

	it("should render description with custom description", () => {
		renderWithTheme(<Metadata description="foo" />);

		const description = document.querySelector("meta[name=description]");
		expect(description).toBeInTheDocument();
		expect(description).toHaveAttribute("content", "foo");
	});
});
