import React from "react";
import { render } from "@testing-library/react";

import { ThemeProvider } from "styled-components";
import { theme } from "../../src/theme";

export function renderWithTheme(
	ui: Parameters<typeof render>[0],
	options?: Parameters<typeof render>[1]
) {
	return render(ui, {
		wrapper: ({ children }) => (
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		),
		...options,
	});
}
