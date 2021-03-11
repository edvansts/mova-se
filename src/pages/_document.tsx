import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="shortcut icon"
                        href="favicon.png"
                        type="image/png"
                    />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap"
                        rel="stylesheet"
                    />

                    {/* <title>Mova-se</title> */}
                </Head>
                <body>
                    {/* <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js" />
                    <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-analytics.js" /> */}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
