import { axe } from "jest-axe";
import { render } from "@testing-library/react";
import { Button } from ".";

describe("Button", () => {
	const props = {
		onClick: () => {},
	};

	it("confirms there are no obvious accessibility issues", async () => {
		const { container } = render(<Button {...props}>Click me</Button>);
		expect(await axe(container)).toHaveNoViolations();
	});

	it("should have type 'button' by default", () => {
		const { getByRole } = render(<Button {...props}>Click me</Button>);
		expect(getByRole("button")).toHaveAttribute("type", "button");
	});

	it("should have type 'submit' when passed", () => {
		const { getByRole } = render(
			<Button {...props} type="submit">
				Click me
			</Button>
		);
		expect(getByRole("button")).toHaveAttribute("type", "submit");
	});

	it("should call onClick when clicked", () => {
		const onClick = jest.fn();
		const { getByRole } = render(<Button onClick={onClick}>Click me</Button>);
		getByRole("button").click();
		expect(onClick).toHaveBeenCalled();
	});

	it("should prevent event default when clicked", () => {
		const onClick = jest.fn();
		const { getByRole } = render(<Button onClick={onClick}>Click me</Button>);
		const event = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
		});

		getByRole("button").dispatchEvent(event);
		expect(event.defaultPrevented).toBe(true);
	});

	it("should not call onClick when disabled", () => {
		const onClick = jest.fn();
		const { getByRole } = render(
			<Button disabled onClick={onClick}>
				Click me
			</Button>
		);
		getByRole("button").click();
		expect(onClick).not.toHaveBeenCalled();
	});

	it("should not call onClick when isLoading", () => {
		const onClick = jest.fn();
		const { getByRole } = render(
			<Button isLoading onClick={onClick}>
				Click me
			</Button>
		);
		getByRole("button").click();
		expect(onClick).not.toHaveBeenCalled();
	});

	it("should render children", () => {
		const { getByText } = render(<Button {...props}>Click me</Button>);
		expect(getByText("Click me")).toBeInTheDocument();
	});
});
