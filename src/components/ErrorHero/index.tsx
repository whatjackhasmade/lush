import { Text, Title } from "lush/components";
import * as S from "./styles";

export const ErrorHero: React.FC<{
	children?: React.ReactNode;
	description?: string | null;
	title: string;
}> = ({ children, description, title }) => (
	<S.ErrorHero>
		<Title size="displayLarge">{title}</Title>
		{description && <Text>{description}</Text>}
		<div>{children}</div>
	</S.ErrorHero>
);
