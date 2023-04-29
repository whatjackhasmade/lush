import * as React from "react";
import { render } from "@testing-library/react";

import { useInView } from ".";

const Component: React.FC = () => {
	const { isInView, ref } = useInView();

	return (
		<>
			<p ref={ref}>Am I in view?</p>
			<p>{isInView ? `Yes, I'm in view` : `No, not in view yet`}</p>
		</>
	);
};

const setupIntersectionObserverMock = ({
	root = null,
	rootMargin = "",
	thresholds = [],
	disconnect = () => null,
	observe = () => null,
	inView = false,
	record = {} as IntersectionObserverEntry,
	unobserve = () => null,
} = {}): void => {
	const takeRecords = () => {
		if (Object.keys(record)?.length) return [record];

		return inView
			? [
					{
						boundingClientRect: {} as DOMRectReadOnly,
						intersectionRatio: 1,
						intersectionRect: {} as DOMRectReadOnly,
						isIntersecting: true,
						rootBounds: null,
						target: {} as Element,
						time: 1,
					},
			  ]
			: [
					{
						boundingClientRect: {} as DOMRectReadOnly,
						intersectionRatio: 0,
						intersectionRect: {} as DOMRectReadOnly,
						isIntersecting: false,
						rootBounds: null,
						target: {} as Element,
						time: 1,
					},
			  ];
	};

	class MockIntersectionObserver implements IntersectionObserver {
		readonly root: Element | null = root;

		readonly rootMargin: string = rootMargin;

		readonly thresholds: ReadonlyArray<number> = thresholds;

		disconnect: () => void = disconnect;

		observe: (target: Element) => void = observe;

		takeRecords: () => IntersectionObserverEntry[] = takeRecords;

		unobserve: (target: Element) => void = unobserve;

		constructor(
			callback: (
				entries: IntersectionObserverEntry[],
				observer: IntersectionObserver
			) => void
		) {
			callback(takeRecords(), this);
		}
	}

	Object.defineProperty(window, "IntersectionObserver", {
		configurable: true,
		value: MockIntersectionObserver,
		writable: true,
	});

	Object.defineProperty(global, "IntersectionObserver", {
		configurable: true,
		value: MockIntersectionObserver,
		writable: true,
	});
};

describe("IntersectionObserver", () => {
	const mockObserve = jest.fn();

	beforeEach(() => {
		setupIntersectionObserverMock({
			inView: true,
			observe: mockObserve,
		});

		jest.resetAllMocks();
	});

	it("should be in view", async () => {
		const { getByText } = render(<Component />);

		expect(mockObserve).toHaveBeenCalled();

		const answer = getByText(`Yes, I'm in view`);
		expect(answer).toBeInTheDocument();
	});

	it("should not be in view", async () => {
		setupIntersectionObserverMock({
			inView: false,
		});

		const { getByText } = render(<Component />);

		const answer = getByText(`No, not in view yet`);
		expect(answer).toBeInTheDocument();
	});

	it("handles onChange callback", async () => {
		const mockOnChange = jest.fn();

		const ComponentOnChange: React.FC = () => {
			const { ref } = useInView({
				onChange: mockOnChange,
			});

			return <p ref={ref}>Am I in view?</p>;
		};

		render(<ComponentOnChange />);
		expect(mockOnChange).toHaveBeenCalledWith({ isInView: true });
	});

	it("handles skip option", async () => {
		const mockOnChange = jest.fn();

		const ComponentOnChange: React.FC = () => {
			const { ref } = useInView({
				onChange: mockOnChange,
				skip: true,
			});

			return <p ref={ref}>Am I in view?</p>;
		};

		render(<ComponentOnChange />);
		expect(mockOnChange).not.toHaveBeenCalled();
	});
});
