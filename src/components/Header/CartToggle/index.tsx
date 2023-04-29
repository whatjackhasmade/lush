import { Icon, VisuallyHidden } from "lush/components";
import { Translation } from "lush/enums";
import { useCart } from "lush/hooks";
import { useTranslation } from "next-i18next";
import { FC } from "react";

import * as S from "./styles";

export const CartToggle: FC = () => {
	const { count, pullout } = useCart();
	const { t } = useTranslation(Translation.Common);

	return (
		<S.Toggle
			aria-checked={pullout.isOpen}
			onClick={(event) => {
				event.preventDefault();
				pullout.setIsOpen(!pullout.isOpen);
			}}
			role="switch"
			type="button"
		>
			<Icon.Bag />
			<VisuallyHidden>{t("cart")}</VisuallyHidden>
			{!!count && <S.Count>{count}</S.Count>}
		</S.Toggle>
	);
};
