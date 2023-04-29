import * as React from "react";
import { SVGProps } from "react";
const SvgTimes = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 13 13" {...props}>
		<path
			fill="currentColor"
			d="m7.6 6.5 5.2-5.2c.1-.1.2-.3.2-.5s-.1-.4-.2-.5c-.3-.3-.8-.3-1.1 0L6.5 5.4 1.3.2C1-.1.5-.1.2.2c-.3.3-.3.8 0 1.1l5.2 5.2-5.2 5.2c-.3.3-.3.8 0 1.1.3.3.8.3 1.1 0l5.2-5.2 5.2 5.2c.1.1.3.2.5.2s.4-.1.5-.2c.1-.1.2-.3.2-.5s-.1-.4-.2-.5L7.6 6.5z"
		/>
	</svg>
);
export default SvgTimes;
