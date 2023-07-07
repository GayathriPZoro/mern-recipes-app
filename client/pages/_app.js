import Head from "next/head";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import {SessionProvider} from "next-auth/react";
import store from "../app/redux/store";
import MainLayout from "../app/layout";
import MyThemeProvider from "../app/components/themeProvider";

const persistor = persistStore(store)

export default function MyApp({ Component, pageProps: {session, ...pageProps} }) {

    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SessionProvider session={session}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <MyThemeProvider pageProps={pageProps}>
                            <MainLayout>
                                <Component {...pageProps} />
                            </MainLayout>
                        </MyThemeProvider>
                    </PersistGate>
                </Provider>
            </SessionProvider>
        </div>
    )
}