import { useEffect } from "react";

export function useKeyPress(key: KeyboardEvent["key"], callback: () => void) {
	useEffect(() => {
		function downHandler(event: KeyboardEvent): void {
			if (event.key === key) {
				callback();
			}
		}

		window.addEventListener("keydown", downHandler);

		return () => {
			window.removeEventListener("keydown", downHandler);
		};
	}, [callback, key]);
}
