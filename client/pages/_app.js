import Head from "next/head";
import {SessionProvider} from "next-auth/react";
import MainLayout from "../app/layout";
import Providers from "../app/providers";

export default function MyApp({ Component, pageProps: {session, ...pageProps} }) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SessionProvider session={session}>
                <Providers pageProps={pageProps}>
                    <MainLayout>
                        <Component {...pageProps} />
                    </MainLayout>
                </Providers>
            </SessionProvider>
        </div>
    )
}