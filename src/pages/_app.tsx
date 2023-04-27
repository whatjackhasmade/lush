import { appWithTranslation } from "next-i18next";
import { DefaultLayout } from "lush/components";
import { ApolloProvider, CartProvider } from "lush/context";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "styled-components";
import { theme } from "lush/theme";
import { GlobalStyle } from "lush/components";

const handwritten = localFont({ src: "../assets/fonts/handwritten.woff" });
const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>{`
				:root {
					--font-inter: ${inter.style.fontFamily};
					--font-handwritten: ${handwritten.style.fontFamily};
				}
			`}</style>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<ApolloProvider pageProps={pageProps}>
					<CartProvider>
						<DefaultLayout>
							<Component {...pageProps} />
						</DefaultLayout>
					</CartProvider>
				</ApolloProvider>
			</ThemeProvider>
		</>
	);
}

export default appWithTranslation(App);
