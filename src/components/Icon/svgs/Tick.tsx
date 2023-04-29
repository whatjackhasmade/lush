import * as React from "react";
import { SVGProps } from "react";
const SvgTick = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 14 10"
		{...props}
	>
		<path
			fill="currentColor"
			d="M4.817 10 0 5.234l.925-.915L4.817 8.17 13.075 0 14 .915 4.817 10Z"
		/>
	</svg>
);
export default SvgTick;
