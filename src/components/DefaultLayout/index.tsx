import { useTranslation } from "next-i18next";
import { FC, PropsWithChildren } from "react";
import { AnimatePresence } from "framer-motion";

import { Cart, Container, Header } from "lush/components";
import { Translation } from "../../enums";

import * as S from "./styles";
import { VisuallyHidden } from "lush/components";
import { useCart } from "lush/hooks";

type DefaultLayoutProps = PropsWithChildren<{}>;

const mainId = "main-content";

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
	const { t } = useTranslation(Translation.Common);
	const { pullout } = useCart();

	return (
		<Container>
			<S.Wrapper>
				<VisuallyHidden>
					<a href={`#${mainId}`}>{t("skipToContent")}</a>
				</VisuallyHidden>
				<Header />
				<S.Main id={mainId}>
					<S.Content>{children}</S.Content>
				</S.Main>
				<AnimatePresence>{pullout.isOpen && <Cart />}</AnimatePresence>
			</S.Wrapper>
		</Container>
	);
};
