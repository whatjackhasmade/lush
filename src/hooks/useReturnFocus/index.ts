import { useEffect, useRef } from "react";

type FocusableElement = HTMLElement | SVGElement | null;

export const useReturnFocus = (): void => {
	const lastFocusedElement = useRef<FocusableElement>(
		typeof document !== "undefined"
			? (document.activeElement as FocusableElement)
			: null
	);

	useEffect(() => {
		return () => {
			if (!lastFocusedElement.current) return;
			lastFocusedElement.current.focus();
		};
	}, []);
};
