import { useTranslation } from "next-i18next";
import { FC, PropsWithChildren, useContext } from "react";

import { Container, Header } from "lush/components";
import { Translation } from "../../enums";

import * as S from "./styles";
import { VisuallyHidden } from "lush/components";

type DefaultLayoutProps = PropsWithChildren<{}>;

const mainId = "main-content";

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
	const { t } = useTranslation(Translation.Common);

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
			</S.Wrapper>
		</Container>
	);
};
