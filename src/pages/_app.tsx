import { Layout } from "@/components/layout";
import { NotificationArea } from "@/components/snackbar";
import { store } from "@/store";
import "@/styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import theme from "./theme";

interface AppPropsWithLayout extends AppProps {
  Component: AppProps["Component"] & {
    withSearchInput?: boolean;
    withLayout?: boolean;
  };
}

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  const withSearchInput = Component.withSearchInput || false;
  const withLayout = Component.withLayout || false;
  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          {withLayout ? (
            <Layout withSearchInput={withSearchInput}>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
          <NotificationArea />
        </Provider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
