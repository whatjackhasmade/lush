import { Property } from "csstype";
import styled, { css, keyframes } from "styled-components";

// Define a keyframe animation for the skeleton's shimmer effect
const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

interface SkeletonProps {
	borderRadius?: Property.BorderRadius;
	height?: Property.Height;
	width?: Property.Width;
}

export const Skeleton = styled.div<SkeletonProps>(
	({ borderRadius, height = "100%", width = "100%" }) => css`
		background: #f6f7f8;
		background-image: linear-gradient(
			to right,
			#f6f7f8 0%,
			#edeef1 20%,
			#f6f7f8 40%,
			#f6f7f8 100%
		);
		background-repeat: no-repeat;
		background-size: 800px 800px;
		border-radius: ${borderRadius};
		display: inline-block;
		line-height: 1;
		width: ${width};
		height: ${height};
		animation: ${shimmer} 1s ease-in-out infinite;
	`
);
