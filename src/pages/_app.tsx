import { appWithTranslation } from "next-i18next";
import { DefaultLayout } from "lush/components";
import { ApolloProvider, CartProvider } from "lush/context";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "styled-components";
import { theme } from "lush/theme";
import { GlobalStyle } from "lush/components";
import { MotionConfig } from "framer-motion";
import toast, { ToastBar, Toaster } from "react-hot-toast";

const handwritten = localFont({ src: "../assets/fonts/handwritten.woff" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

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
				<MotionConfig reducedMotion="user">
					<GlobalStyle />
					<ApolloProvider pageProps={pageProps}>
						<CartProvider>
							<DefaultLayout>
								<Component {...pageProps} />
								<Toaster position="bottom-center" reverseOrder>
									{(t) => (
										<ToastBar toast={t}>
											{({ icon, message }) => (
												<>
													{icon}
													{message}
													{t.type !== "loading" && (
														<button onClick={() => toast.dismiss(t.id)}>
															X
														</button>
													)}
												</>
											)}
										</ToastBar>
									)}
								</Toaster>
							</DefaultLayout>
						</CartProvider>
					</ApolloProvider>
				</MotionConfig>
			</ThemeProvider>
		</>
	);
}

export default appWithTranslation(App);
