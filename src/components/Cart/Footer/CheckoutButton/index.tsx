import { FC, useEffect, useState } from "react";

import * as S from "./styles";

export const CheckoutButton: FC = () => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!isLoading) return;

		const timeoutId = setTimeout(() => {
			setIsLoading(false);
			if (typeof window !== "undefined")
				window.alert(
					"In the real world, this would take you to the checkout page."
				);
		}, 1500);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [isLoading]);

	return (
		<>
			<S.Button
				disabled={isLoading}
				type="button"
				onClick={(event) => {
					event.preventDefault();
					setIsLoading(true);
				}}
			>
				Checkout
			</S.Button>
		</>
	);
};
