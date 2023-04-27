import { Breakpoint } from "lush/enums";

export const breakpoints = {
	[Breakpoint.Mobile]: 480,
	[Breakpoint.MobileLarge]: 720,
	[Breakpoint.TabletPortrait]: 1024,
	[Breakpoint.DesktopSmall]: 1260,
	[Breakpoint.Desktop]: 1440,
	[Breakpoint.DesktopLarge]: 1920,
} as const;
