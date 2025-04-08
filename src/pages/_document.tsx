import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from "@mui/material-nextjs/v15-pagesRouter";
import { DocumentContext, Head, Html, Main, NextScript } from "next/document";

export default function Document(props: DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) =>
  documentGetInitialProps(ctx);
