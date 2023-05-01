import { FC, useRef } from "react";
import FocusLock from "react-focus-lock";
import { useCart, useOnClickOutside, useReturnFocus } from "lush/hooks";

import * as S from "./styles";
import { Icon, Text, Title, VisuallyHidden } from "lush/components";
import { CartItem } from "../CartItem";
import { CartFooter } from "./CartFooter";
import { useTranslation } from "next-i18next";
import { Translation } from "lush/enums";

export const CartContents: FC = () => {
	const { t } = useTranslation(Translation.Common);
	const { cart, count, pullout } = useCart();
	const refPullout = useRef<HTMLElement>(null);
	useReturnFocus();

	useOnClickOutside(refPullout, () => {
		pullout.setIsOpen(false);
	});

	return (
		<S.Cart ref={refPullout}>
			<FocusLock className="focus-lock">
				<S.Contents>
					<S.Header>
						<Title family="inter">
							{t("cart.title", {
								count,
							})}
						</Title>
						<S.Close
							onClick={(event) => {
								event.preventDefault();
								pullout.setIsOpen(false);
							}}
							type="button"
						>
							<VisuallyHidden>{t("cart.close")}</VisuallyHidden>
							<Icon.Times />
						</S.Close>
					</S.Header>
					<S.Content>
						{!count && (
							<S.Empty>
								<Icon.Bag />
								<Title
									family="inter"
									margin={{
										top: "regular",
									}}
								>
									{t("cart.empty.title")}
								</Title>
								<Text
									align="center"
									margin={{
										bottom: "large",
										top: "regular",
									}}
								>
									{t("cart.empty.body")}
								</Text>
							</S.Empty>
						)}
						{!!cart.length && (
							<S.Items>
								{cart.map((item) => (
									<CartItem key={item.product.id} {...item} />
								))}
							</S.Items>
						)}
					</S.Content>
					{count && <CartFooter />}
				</S.Contents>
			</FocusLock>
		</S.Cart>
	);
};
