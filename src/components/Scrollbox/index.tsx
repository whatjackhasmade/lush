import SimpleBar from "simplebar-react";
import { forwardRef, PropsWithChildren } from "react";

const Scrollbox = forwardRef<HTMLDivElement, PropsWithChildren>(
	({ children }, ref) => (
		<SimpleBar
			scrollableNodeProps={{ ref }}
			style={{ height: "100%", maxHeight: "100%" }}
		>
			{children}
		</SimpleBar>
	)
);

Scrollbox.displayName = "Scrollbox";

export { Scrollbox };
