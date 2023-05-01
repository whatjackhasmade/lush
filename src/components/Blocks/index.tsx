import { FC } from "react";
import parse from "html-react-parser";
import { Text, TextProps } from "lush/components";
import { isBlocks } from "./isBlocks";
import { tryJSONParse } from "./tryJSONParse";

interface BlocksProps {
	text?: TextProps;
	value?: string | null;
}

export const Blocks: FC<BlocksProps> = ({ text, value }) => {
	if (!value) return null;

	const { blocks } = tryJSONParse(value);
	const parsedBlocks = isBlocks(blocks) ? blocks : [];

	if (!parsedBlocks?.length) return null;

	return (
		<>
			{parsedBlocks.map((block) => {
				switch (block.type) {
					case "paragraph": {
						return (
							<Text
								key={`block-${block.id}`}
								margin={{
									bottom: "regular",
								}}
								{...text}
							>
								{parse(block.data.text)}
							</Text>
						);
					}
					default: {
						return null;
					}
				}
			})}
		</>
	);
};
