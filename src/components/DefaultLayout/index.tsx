import { useTranslation } from "next-i18next";
import { FC, PropsWithChildren } from "react";
import { AnimatePresence } from "framer-motion";

import { Cart, Container, Header, VisuallyHidden } from "lush/components";
import { Translation } from "../../enums";

import { useCart } from "lush/hooks";

type DefaultLayoutProps = PropsWithChildren<{}>;

export const mainId = "main-content";

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
	const { t } = useTranslation(Translation.Common);
	const { pullout } = useCart();

	return (
		<Container>
			<div>
				<VisuallyHidden>
					<a href={`#${mainId}`}>{t("skipToContent")}</a>
				</VisuallyHidden>
				<Header />
				<main id={mainId}>
					<div>{children}</div>
				</main>
				<AnimatePresence>{pullout.isOpen && <Cart />}</AnimatePresence>
			</div>
		</Container>
	);
};
