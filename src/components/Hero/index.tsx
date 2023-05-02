import { FC } from "react";
import * as S from "./styles";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { Title } from "lush/components/Title";

interface HeroProps {
	image?: StaticImageData;
	title: string;
}

export const Hero: FC<HeroProps> = ({ image, title }) => (
	<S.Hero>
		{title && (
			<S.Contents>
				<Title as="h1" colourKey="white" family="inter" size="displayXLarge">
					{title}
				</Title>
			</S.Contents>
		)}
		{image && <Image src={image} alt="" />}
	</S.Hero>
);
