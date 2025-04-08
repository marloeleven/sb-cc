import { Layout } from "@/components/layout";
import "@/styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppCacheProvider } from "@mui/material-nextjs/v15-pagesRouter";
import type { AppProps } from "next/app";
import Head from "next/head";
import theme from "./theme";

interface AppPropsWithLayout extends AppProps {
  Component: AppProps["Component"] & {
    withSearchInput?: boolean;
  };
}

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  const withSearchInput = Component.withSearchInput || false;
  return (
    <>
      <AppCacheProvider {...props}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
      </AppCacheProvider>
      <ThemeProvider theme={theme}>
        <Layout withSearchInput={withSearchInput}>
          <Component {...pageProps} />
        </Layout>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}
