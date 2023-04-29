import { FC, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

import * as S from "./styles";
import { Translation } from "lush/enums";

export const CheckoutButton: FC = () => {
	const { t } = useTranslation(Translation.Common);
	const [isEmulatingLoading, setEmulateLoading] = useState(false);

	useEffect(() => {
		if (!isEmulatingLoading) return;

		const timeoutId = setTimeout(() => {
			setEmulateLoading(false);

			if (typeof window !== "undefined")
				window.alert(
					"In the real world, this would take you to the checkout page."
				);
		}, 1500);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [isEmulatingLoading]);

	return (
		<>
			<S.Button
				disabled={isEmulatingLoading}
				type="button"
				onClick={(event) => {
					event.preventDefault();
					setEmulateLoading(true);
				}}
			>
				{t("cart.checkout")}
			</S.Button>
		</>
	);
};
