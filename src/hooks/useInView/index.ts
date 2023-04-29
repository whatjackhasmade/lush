import { useCallback, useRef, useState } from "react";

export type IntersectionOnChangeArguments = {
	isInView: boolean;
};

export interface IntersectionOptions extends IntersectionObserverInit {
	onChange?: (OnChangeDetails: IntersectionOnChangeArguments) => void;
	skip?: boolean;
}

export type UseInViewResponse = {
	entry?: IntersectionObserverEntry;
	isInView: boolean;
	ref: (node?: Element | null) => void;
};

export function useInView({
	onChange,
	root = null,
	rootMargin = "0%",
	skip = false,
	threshold = 0,
}: IntersectionOptions = {}): UseInViewResponse {
	const [isInView, setIsInView] = useState(false);
	const observer = useRef<IntersectionObserver>();
	const entry = useRef<IntersectionObserverEntry>();

	const ref = useCallback(
		(node?: Element | null) => {
			if (skip || !window.IntersectionObserver) return;

			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver(
				([entryObserving]) => {
					if (!entry.current) entry.current = entryObserving;

					setIsInView(entryObserving.isIntersecting);

					onChange?.({
						isInView: entryObserving.isIntersecting,
					});
				},
				{ root, rootMargin, threshold }
			);

			if (node) observer.current.observe(node);
		},
		[onChange, root, rootMargin, skip, threshold]
	);

	return {
		entry: entry.current,
		isInView,
		ref,
	};
}
