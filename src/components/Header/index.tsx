import { Pathname } from "lush/enums/pathname";
import Link from "next/link";
import { LanguagePicker } from "../LanguagePicker";
import * as S from "./styles";
import { useTranslation } from "next-i18next";
import { Translation } from "lush/enums";
import { Cart } from "../Cart";

export const Header: React.FC = () => {
	const { t } = useTranslation(Translation.ComponentHeader);

	const navigation = [
		{
			title: t("navigation.index"),
			href: {
				pathname: Pathname.Index,
			},
		},
		{
			title: t("navigation.products"),
			href: {
				pathname: Pathname.Index,
			},
		},
	];

	return (
		<S.Header>
			<Link
				href={{
					pathname: Pathname.Index,
				}}
			>
				<S.Title>{t("title")}</S.Title>
			</Link>
			<S.Navigation>
				{navigation.map(({ title, href }) => (
					<Link href={href} key={`header-navigation-${title}`}>
						{title}
					</Link>
				))}
			</S.Navigation>
			<S.Actions>
				<LanguagePicker />
				<Cart />
			</S.Actions>
		</S.Header>
	);
};
