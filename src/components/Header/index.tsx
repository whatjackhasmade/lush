import { Pathname } from "lush/enums/pathname";
import Link from "next/link";
import { LanguagePicker } from "../LanguagePicker";
import * as S from "./styles";
import { useTranslation } from "next-i18next";
import { Translation } from "lush/enums";
import { CartToggle } from "./CartToggle";

export const Header: React.FC = () => {
	const { t } = useTranslation(Translation.Common);

	const navigation = [
		{
			title: t("header.navigation.index"),
			href: {
				pathname: Pathname.Index,
			},
		},
		{
			title: t("header.navigation.products"),
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
				<S.Title>{t("header.title")}</S.Title>
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
				<CartToggle />
			</S.Actions>
		</S.Header>
	);
};
