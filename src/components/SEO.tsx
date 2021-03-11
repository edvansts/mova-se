import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    shouldHaveExcludeTitleSuffix?: boolean;
    shouldIndexPage?: boolean;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image,
    shouldHaveExcludeTitleSuffix = false,
    shouldIndexPage = true,
}) => {
    const { locale } = useRouter();
    const { t } = useTranslation();

    const pageTitle = `${title} ${
        !shouldHaveExcludeTitleSuffix ? `| ${t('common:appName')}` : ''
    }`;

    const pageImage = `${process.env.NEXT_PUBLIC_API_URL}/${image}`;

    return (
        <Head>
            <title>{pageTitle}</title>

            {description && <meta name="description" content={description} />}
            {pageImage && <meta name="pageImage" content={pageImage} />}

            {!shouldIndexPage && <meta name='robots' content='noIndex,noFollow' />}

            <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
            <meta name="MobileOptimized" content="320" />
            <meta name="HandheldFriendly" content="True" />
            <meta name="theme-color" content="#5965e0" />
            <meta name="msapplication-TileColor" content="#5965e0" />
            <meta name="referrer" content="no-referrer-when-downgrade" />
            <meta name="google" content="notranslate" />

            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:locale" content={locale} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={pageTitle} />
            <meta property="og:image" content={pageImage} />
            <meta property="og:image:secure_url" content={pageImage} />
            <meta property="og:image:alt" content="Thumbnail" />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@moveIt" />
            <meta name="twitter:creator" content="@moveIt" />
            <meta name="twitter:image" content={pageImage} />
            <meta name="twitter:image:src" content={pageImage} />
            <meta name="twitter:image:alt" content="Thumbnail" />
            <meta name="twitter:image:width" content="1200" />
            <meta name="twitter:image:height" content="620" />
        </Head>
    );
};

export default SEO;
