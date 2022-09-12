import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache, { INSERTION_POINT_NAME } from 'styles/emotion-cache';

export default class CustomDocument extends Document {
    static override async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps & { emotionStyleTags: JSX.Element[] }> {
        const originalRenderPage = context.renderPage;

        const cache = createEmotionCache();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const { extractCriticalToChunks } = createEmotionServer(cache);

        context.renderPage = () => originalRenderPage({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            enhanceApp: (App: any) => function EnhanceApp(props) {
                return <App emotionCache={cache} { ...props } />;
            }
        });

        const initialProps = await Document.getInitialProps(context);

        // This is important. It prevents emotion from rendering invalid HTML.
        const emotionStyles = extractCriticalToChunks(initialProps.html);
        const emotionStyleTags = emotionStyles.styles.map((style) => (
            <style 
            key={style.key}
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            dangerouslySetInnerHTML={{ __html: style.css }} />
        ));

        return {
            ...initialProps,
            emotionStyleTags
        }
    }

    override render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="author" content="Maria Solano" />

                    {/* PWA stuff */}
                    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#1C2541" />
                    <meta name="msapplication-TileColor" content="#FFFFFF" />
                    <meta name="theme-color" content="#FFFFFF" />
                    <link rel="manifest" href="/manifest.json" />

                    {/* Google fonts */}
                    <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Bungee+Shade&family=PT+Mono&display=swap" rel="stylesheet" />

                    {/* Programming language icons */}
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />
                    
                    <meta name={`"${INSERTION_POINT_NAME as string}"`} content="" />
                    {(this.props as unknown as { emotionStyleTags: JSX.Element; }).emotionStyleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}