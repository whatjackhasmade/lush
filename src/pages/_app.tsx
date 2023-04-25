import { appWithTranslation } from "next-i18next";
import { DefaultLayout } from "lush/components";
import { ApolloProvider, CartProvider } from "lush/context";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "normalize.css/normalize.css";
import "lush/assets/css/global.css";
import localFont from "next/font/local";

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
			<ApolloProvider pageProps={pageProps}>
				<CartProvider>
					<DefaultLayout>
						<Component {...pageProps} />
					</DefaultLayout>
				</CartProvider>
			</ApolloProvider>
		</>
	);
}

export default appWithTranslation(App);
