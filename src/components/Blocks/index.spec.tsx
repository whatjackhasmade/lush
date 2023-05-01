import React from "react";
import { renderWithTheme } from "../../../.jest";
import { Blocks } from ".";

describe("Blocks component", () => {
	test("renders nothing if value prop is null", () => {
		const { container } = renderWithTheme(<Blocks value={null} />);
		expect(container).toBeEmptyDOMElement();
	});

	test("renders nothing if value prop is undefined", () => {
		const { container } = renderWithTheme(<Blocks value={undefined} />);
		expect(container).toBeEmptyDOMElement();
	});

	test("renders nothing if value prop is invalid json", () => {
		const { container } = renderWithTheme(<Blocks value={`{ sese }`} />);
		expect(container).toBeEmptyDOMElement();
	});

	test("renders nothing if there are no paragraphs in the blocks", () => {
		const { container } = renderWithTheme(
			<Blocks
				value={`
					{
						blocks: [{ id: "1", type: "header", data: { text: "Test header" } }],
					}
				`}
			/>
		);
		expect(container).toBeEmptyDOMElement();
	});

	test("renders paragraphs from the blocks", () => {
		const { getByText } = renderWithTheme(
			<Blocks
				value={`
					{"time": 1681381260950, "blocks": [{"id": "VQhoqiBj6z", "data": {"text": "Warming myrrh and osmanthus soaks"}, "type": "paragraph"}], "version": "2.24.3"}
				`}
			/>
		);

		expect(getByText("Warming myrrh and osmanthus soaks")).toBeInTheDocument();
	});

	it("renders nothing when there are no blocks", () => {
		const { container } = renderWithTheme(<Blocks value={`{ blocks: [] }`} />);
		expect(container).toBeEmptyDOMElement();
	});

	it("renders nothing when there are no paragraphs", () => {
		const { container } = renderWithTheme(
			<Blocks
				value={`
					{
						blocks: [{ id: "1", type: "header", data: { text: "Test header" } }],
					}
				`}
			/>
		);
		expect(container).toBeEmptyDOMElement();
	});
});
