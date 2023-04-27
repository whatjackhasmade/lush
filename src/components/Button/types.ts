import { Variant } from "lush/enums";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	isLoading?: boolean;
	variant?: Variant;
	unstyled?: boolean;
}
