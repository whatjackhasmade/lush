import { axe } from "jest-axe";
import { renderWithTheme } from "../../../.jest";

import { Button } from ".";

describe("Button", () => {
	const props = {
		onClick: () => {},
	};

	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = renderWithTheme(<Button {...props}>Click me</Button>);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("should have type 'button' by default", () => {
		const { getByRole } = renderWithTheme(<Button {...props}>Click me</Button>);
		expect(getByRole("button")).toHaveAttribute("type", "button");
	});

	it("should have type 'submit' when passed", () => {
		const { getByRole } = renderWithTheme(
			<Button {...props} type="submit">
				Click me
			</Button>
		);
		expect(getByRole("button")).toHaveAttribute("type", "submit");
	});

	it("should call onClick when clicked", () => {
		const onClick = jest.fn();
		const { getByRole } = renderWithTheme(
			<Button onClick={onClick}>Click me</Button>
		);
		getByRole("button").click();
		expect(onClick).toHaveBeenCalled();
	});

	it("should prevent event default when clicked", () => {
		const onClick = jest.fn();
		const { getByRole } = renderWithTheme(
			<Button onClick={onClick}>Click me</Button>
		);
		const event = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
		});

		getByRole("button").dispatchEvent(event);
		expect(event.defaultPrevented).toBe(true);
	});

	it("should not call onClick when disabled", () => {
		const onClick = jest.fn();
		const { getByRole } = renderWithTheme(
			<Button disabled onClick={onClick}>
				Click me
			</Button>
		);
		getByRole("button").click();
		expect(onClick).not.toHaveBeenCalled();
	});

	it("should not call onClick when isLoading", () => {
		const onClick = jest.fn();
		const { getByRole } = renderWithTheme(
			<Button isLoading onClick={onClick}>
				Click me
			</Button>
		);
		getByRole("button").click();
		expect(onClick).not.toHaveBeenCalled();
	});

	it("should renderWithTheme children", () => {
		const { getByText } = renderWithTheme(<Button {...props}>Click me</Button>);
		expect(getByText("Click me")).toBeInTheDocument();
	});
});
