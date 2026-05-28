import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* Google's <model-viewer> web component — renders .glb 3D models. */}
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js" async />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
