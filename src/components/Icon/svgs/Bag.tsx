import * as React from "react";
import { SVGProps } from "react";
const SvgBag = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 20 25" {...props}>
		<path
			fill="currentColor"
			d="M2 22.5 3 8.3h2.2v3.4c0 .5.4.8.9.8s.9-.4.9-.8V8.3h6.5v3.4c0 .5.4.8.9.8s.9-.4.9-.8V8.3h2.1l1 14.2H2zM6.8 5c0-1.7 1.4-3.1 3.2-3.1s3.2 1.4 3.2 3.1v1.7H6.8V5zm12 2.3c0-.5-.4-.8-.9-.8h-3V4.8C15 2.2 12.7 0 10 0 7.2 0 5 2.2 5 4.8v1.7H2c-.4 0-.8.3-.9.8L0 23.3c0 .2.1.4.2.6.1.2.4.3.7.3h18.3c.3 0 .5-.1.6-.2.2-.2.3-.4.2-.6L18.8 7.3z"
		/>
	</svg>
);
export default SvgBag;
