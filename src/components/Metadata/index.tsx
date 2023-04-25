import Head from "next/head";
import type { FC } from "react";

import { App } from "../../enums";

interface MetadataProps {
	description?: string | null;
	title?: string | null;
}

export const Metadata: FC<MetadataProps> = ({ description, title }) => (
	<Head>
		<meta charSet="utf-8" />
		<meta content="none" name="robots" />
		<meta content={App.Name} name="application-name" />
		<meta content={App.Name} name="apple-mobile-web-app-title" />
		<meta content="initial-scale=1.0, width=device-width" name="viewport" />
		<meta content={description ?? App.Description} name="description" />

		<title>{title ? `${title} | ${App.Name}` : App.Name}</title>
	</Head>
);
